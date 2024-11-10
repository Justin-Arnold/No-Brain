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
        rejectLabel: 'cancel',
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
    <NuxtLayout name="overview">
        <template #header>
            <OverviewHeader :title="project!.name" :description="project?.description ?? undefined" />
        </template>
        <template #header_action-bar>
            <Icon name="mdi:trash" size="24"
                class="flex-shrink-0 hover:text-red-400 transition-colors duration-300 cursor-pointer"
                @click="confirmDelete">
            </Icon>
            <BaseConfirmDialog />
        </template>
        <template #panel>
            <div class="flex gap-2 items-center">
                <h2 class="text-lg font-medium">
                    Milestones
                </h2>
                <span class="grid place-items-center w-fit aspect-square rounded-full bg-surface-600 p-1 cursor-pointer"
                    @click="isMilestoneCreateDialogOpen = true">
                    <Icon name="mdi-plus"></Icon>
                    <MilestoneCreateDialog v-model="isMilestoneCreateDialogOpen" :project-id="project!.id" />
                </span>
            </div>
            <hr class="border-t-surface-700" />
            <div class="flex flex-col gap-2">
                <div v-for="milestone in project!.milestone"
                    class="flex flex-col gap-1 bg-surface-900 rounded p-2 cursor-pointer"
                    @click="navigateTo(`milestones/${milestone.id}`)">
                    <span class="font-semibold">{{ milestone.name }}</span>
                    <span class="text-gray-400">{{ milestone.description }}</span>
                </div>
            </div>
        </template>
    </NuxtLayout>
</template>
