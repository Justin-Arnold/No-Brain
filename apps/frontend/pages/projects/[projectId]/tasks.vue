<script setup lang="ts">
import { ZodError } from "zod";
import type { Database } from "~/types/database.types";
import type { TaskUpdateBody } from "ff/frontend/server/api/tasks/[taskId].put";

definePageMeta({
    middleware: "authentication",
});

type Status = Database['public']['Enums']['status']
type Task = Database['public']['Tables']['task']['Row']

const route = useRoute();
const projectId = route.params.projectId as string;


const user = useSupabaseUser();
const userID = computed(() => user.value?.id);


const { data: project, refresh } = await useFetch(
    `/api/projects/${projectId}`,
    { query: { id: userID } },
);

const newTask = ref("");

const addTask = async () => {
    if (!project.value) return;
    await useFetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
            name: newTask.value,
            projectId: route.params.projectId,
            order: project.value.task.length + 1,
        }),
    });
    newTask.value = "";
    refresh();
};

const updateTask = async (task: Task) => {
    const body: TaskUpdateBody = {
        name: task.name,
        status: task.status,
        order: task.order
    };
    try {
        await useFetch(`/api/tasks/${task.id}`, {
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
        return project.value.task.sort((a, b) => a.order - b.order);
    },
    set(value) {
        value.forEach(async (task, index) => {
            await useFetch(`/api/tasks/${task.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    name: task.name,
                    completed: task.status,
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


function deleteTask(id: number) {
    useFetch(`/api/tasks/${id}`, {
        method: "DELETE",
    }).then(() => {
        refresh();
    });
}

function toggleTaskCompletedStatus(task: Task) {
    if (task.status === 'completed') {
        task.status = 'not_started'
    } else {
        task.status = 'completed'
    }
}

function isTaskCompleted(task: Task) {
    return task.status === 'completed'
}

function onTaskStatusUpdate(task: Task) {
    toggleTaskCompletedStatus(task)
    updateTask(task)
}
</script>

<template>
    <div class="h-full overflow-hidden">
        <div class="flex h-full w-full flex-col items-center overflow-hidden">
            <div class="flex h-full min-w-[600px] flex-shrink-0 flex-col gap-4 overflow-hidden">
                <InputTextNewTask v-model="newTask" @keyup.enter="addTask" @icon-clicked="addTask" />
                <draggable v-model="sortedTasks" item-key="id" tag="span"
                    class="flex flex-grow flex-col gap-2 overflow-y-auto" :move="move" @start="drag = true"
                    @end="drag = false">
                    <template #item="{ element }">
                        <span :id="element.id"
                            class="flex w-full flex-shrink-0 select-none items-center justify-between gap-4 overflow-hidden whitespace-nowrap rounded bg-gray-500 p-2"
                            :class="{ '!bg-gray-700 opacity-40': isTaskCompleted(element) }">
                            <BaseCheckbox :model-value="isTaskCompleted(element)" binary
                                @update:model-value="onTaskStatusUpdate(element)" @click.stop />
                            <span class="flex-grow truncate">
                                {{ element.name }} - {{ element.order }}
                            </span>
                            <Icon name="mdi:trash" size="24"
                                class="flex-shrink-0 hover:text-red-400 transition-colors duration-300 cursor-pointer"
                                @click="deleteTask(element.id)"></Icon>
                        </span>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>
