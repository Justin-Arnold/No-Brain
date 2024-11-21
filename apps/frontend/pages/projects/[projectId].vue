<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});

const route = useRoute()
const rootPath = route.fullPath

const pageNavigationStore = usePageNavigationStore()

onMounted(() => {
    const projectId = route.params.projectId
    pageNavigationStore.setNavItems([
        {
            label: 'Overview',
            path: `${rootPath}/overview`
        }, {
            label: 'Milestones',
            path: `${rootPath}/milestones`
        }, {
            label: 'Tasks',
            path: `${rootPath}/tasks`
        }
    ])
    navigateTo(`${projectId}/overview`)
})
</script>

<template>
    <RouterView></RouterView>
</template>