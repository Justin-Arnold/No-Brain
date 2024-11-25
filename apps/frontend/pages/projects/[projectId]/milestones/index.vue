<script setup lang="ts">
////////////
// Page Data
////////////
definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});
/////////////
// Route Data
/////////////
const route = useRoute();
const projectId = route.params.projectId as string;

const user = useSupabaseUser();
const userID = computed(() => user.value?.id);
/////////////////
// Milestone Data
/////////////////
const { data: project, refresh } = await useFetch(
    `/api/projects/${projectId}`,
    { query: { id: userID } },
);

const milestones = computed(() => {
    if (!project.value) {
        return []
    }

    if (!project.value.milestone) {
        return []
    }

    return project.value.milestone
})
</script>

<template>
    <PageProjectsMilestones :milestones="milestones" />
</template>