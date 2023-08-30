<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { ZodError } from "zod";
import type { TaskUpdateBody } from "~/server/api/tasks/[taskId].put";

definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});

const route = useRoute();
const projectId = route.params.projectId;
const userID = route.query.id;
const { data: project, refresh } = await useFetch(
    `/api/projects/${projectId}`,
    {
        query: { id: userID },
    },
);

const newTask = ref("");

const addTask = async () => {
    if (!project.value) return;
    await useFetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
            name: newTask.value,
            projectId: route.params.projectId,
            order: project.value.tasks.length + 1,
        }),
    });
    newTask.value = "";
    refresh();
};

const updateTask = async (
    id: number,
    name: string,
    completed: boolean,
    order: number,
) => {
    const body: TaskUpdateBody = { name, completed, order };
    try {
        await useFetch(`/api/tasks/${id}`, {
            method: "PUT",
            body,
        });
        refresh();
    } catch (error) {
        // check if unknown typed error is a ZodError type
        if (error instanceof ZodError) {
            // handle error
        }
    }
};

const sortedTasks = computed({
    get() {
        if (!project.value) return [];
        return project.value.tasks.sort((a, b) => a.order - b.order);
    },
    set(value) {
        value.forEach(async (task, index) => {
            await useFetch(`/api/tasks/${task.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    name: task.name,
                    completed: task.completed,
                    order: index,
                }),
            });
        });
        refresh();
    },
});

const drag = ref(false);

const move = () => {
    // console.log(moveEvent);
};

function expandSelf(elementId: string) {
    // toggle whitespace nowrap on clicked element
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle("whitespace-nowrap");
    }
    // on a child span of that element toggle truncate
    const child = element?.children[1];
    if (child) {
        child.classList.toggle("truncate");
    }
}

const newName = ref(project?.value?.name || "");
const editMode = ref(false);
const nuxtApp = useNuxtApp();
const refreshSidebar = nuxtApp.$refreshSidebar as () => void;

function updateProjectName(name: string) {
    useFetch(`/api/projects/${projectId}`, {
        method: "PUT",
        body: { name: name },
    }).then(() => {
        editMode.value = false;
        refreshSidebar();
        refresh();
    });
}

const confirm = useConfirm();

function confirmDelete() {
    // todo remove any
    confirm.require({
        message: `Are you sure you want to delete "${project.value?.name}"?`,
        icon: "pi pi-exclamation-triangle",
        accept: () => {
            useFetch(`/api/projects/${projectId}`, {
                method: "DELETE",
            }).then(() => {
                refreshSidebar();
                navigateTo("/");
            });
        },
    });
}

function deleteTask(id: number) {
    useFetch(`/api/tasks/${id}`, {
        method: "DELETE",
    }).then(() => {
        refresh();
    });
}
</script>

<template>
    <div>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <BaseInputText
                    v-if="editMode"
                    v-model="newName"
                    @keydown.enter="updateProjectName(newName)"
                ></BaseInputText>
                <h1 v-else>{{ project?.name }}</h1>
            </div>
            <ProjectsContextMenuButton
                @edit-name="editMode = true"
                @delete="confirmDelete"
            />
            <BaseConfirmDialog />
        </div>
        <hr class="mb-4 mt-1" />
        <div class="flex h-full w-full flex-col items-center">
            <div class="flex h-full min-w-[600px] flex-shrink-0 flex-col gap-4">
                <InputTextNewTask
                    v-model="newTask"
                    @keyup.enter="addTask"
                    @icon-clicked="addTask"
                />
                <draggable
                    v-model="sortedTasks"
                    item-key="id"
                    tag="span"
                    class="flex flex-grow flex-col gap-2 overflow-y-auto"
                    :move="move"
                    @start="drag = true"
                    @end="drag = false"
                >
                    <template #item="{ element }">
                        <span
                            :id="element.id"
                            class="flex w-full flex-shrink-0 cursor-pointer select-none items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded bg-gray-500 p-2"
                            :class="{ '!bg-gray-700': element.completed }"
                            @click="expandSelf(element.id)"
                        >
                            <BaseCheckbox
                                :model-value="element.completed"
                                :class="{ 'opacity-20': element.completed }"
                                binary
                                @update:model-value="
                                    updateTask(
                                        element.id,
                                        element.name,
                                        !element.completed,
                                        project!.tasks[
                                            !element.completed
                                                ? project!.tasks.length - 1
                                                : 0
                                        ].order,
                                    )
                                "
                                @click.stop
                            />
                            <span class="flex-grow truncate">
                                {{ element.name }}
                            </span>
                            <Icon
                                name="mdi:trash"
                                size="24"
                                class="flex-shrink-0 hover:text-red-400 transition-colors duration-300"
                                @click="deleteTask(element.id)"
                            ></Icon>
                        </span>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>
