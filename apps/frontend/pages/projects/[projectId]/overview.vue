<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
});

const route = useRoute();
const projectId = route.params.projectId as string;

const user = useSupabaseUser();
const userID = computed(() => user.value?.id);

const { data: project } = await useFetch(
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
</script>

<template>
    <div class="h-full overflow-hidden flex flex-col">
        <div class="flex justify-between gap-4 h-full">
            <div class="flex flex-col items-center justify-between">
                <div class="flex flex-col items-start gap-2">
                    <BaseTag :label="areaName" />
                    <h1 class="text-4xl">{{ project?.name }}</h1>
                    <span class="text-lg">{{ project?.description }}</span>
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
                    <div v-for="milestone in project!.milestone" class="flex flex-col gap-1 bg-surface-900 rounded p-2">
                        <span class="font-semibold">{{ milestone.name }}</span>
                        <span class="text-gray-400">{{ milestone.description }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MilestoneCreateDialog v-model="isMilestoneCreateDialogOpen" :project-id="project!.id" />
</template>
