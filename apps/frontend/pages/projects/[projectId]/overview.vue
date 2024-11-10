<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
});

const route = useRoute();
const projectId = route.params.projectId as string;

const user = useSupabaseUser();
const userID = computed(() => user.value?.id);

const { data: project, refresh } = await useFetch(
    `/api/projects/${projectId}`,
    { query: { id: userID } },
);

const areaName = ref('')

const isMilestoneCreateDialogOpen = ref(false)

onBeforeMount(async () => {
    if (!project.value) {
        return ''
    }
    const area = await useArea(project.value?.area_id)
    areaName.value = area.value.name
})

const confirm = useConfirm()

function confirmDelete() {
    console.log('test')
    confirm.require({
        header: 'Confirm Project Deletion',
        message: `Are you sure you want to delete "${project.value?.name}"?`,
        icon: "pi pi-exclamation-triangle",
        accept: () => {
            useFetch(`/api/projects/${projectId}`, {
                method: "DELETE",
            }).then(() => {
                navigateTo("/projects");
            });
        },
    });
}
</script>

<template>
    <div class="h-full overflow-hidden flex flex-col">
        <div class="flex justify-between gap-4 h-full">
            <div class="flex flex-col items-center justify-between w-full">
                <div class="w-full flex items-center justify-between">
                    <div class="flex flex-col items-start gap-2">
                        <BaseTag :label="areaName" />
                        <h1 class="text-4xl">{{ project?.name }}</h1>
                        <span class="text-lg">{{ project?.description }}</span>
                    </div>
                    <div>
                        <Icon name="mdi:trash" size="24"
                            class="flex-shrink-0 hover:text-red-400 transition-colors duration-300 cursor-pointer"
                            @click="confirmDelete">
                        </Icon>
                        <BaseConfirmDialog />

                    </div>
                </div>
            </div>
            <div class="bg-surface-800 h-full w-[500px] p-4 rounded-md flex flex-col">
                <div class="flex gap-2 items-center">
                    <h2 class="text-lg font-medium">
                        Milestones
                    </h2>
                    <span
                        class="grid place-items-center w-fit aspect-square rounded-full bg-surface-600 p-1 cursor-pointer"
                        @click="isMilestoneCreateDialogOpen = true">
                        <Icon name="mdi-plus"></Icon>
                    </span>
                </div>
                <hr class="border-t-surface-700" />
                <div class="flex flex-col gap-2">
                    <div v-for="milestone in project!.milestone" class="flex flex-col gap-1 bg-surface-900 rounded p-2"
                        @click="navigateTo(`milestones/${milestone.id}`)">
                        <span class="font-semibold">{{ milestone.name }}</span>
                        <span class="text-gray-400">{{ milestone.description }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MilestoneCreateDialog v-model="isMilestoneCreateDialogOpen" :project-id="project!.id" />
</template>
