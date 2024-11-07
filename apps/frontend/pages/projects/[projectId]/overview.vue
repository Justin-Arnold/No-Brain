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
        <div class="flex items-center justify-between">
            <div class="flex flex-col items-start gap-2">
                <BaseTag :label="areaName" />
                <h1 class="text-4xl">{{ project?.name }}</h1>
                <span class="text-lg">{{ project?.description }}</span>
            </div>
        </div>
        <hr class="my-4 border-none" />
    </div>
</template>
