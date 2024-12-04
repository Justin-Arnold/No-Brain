<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});

const route = useRoute()
const rootPath = route.fullPath

const pageNavigationStore = usePageNavigationStore()

onMounted(() => {
    const milestoneId = route.params.milestoneId
    pageNavigationStore.setNavItems([
        {
            label: 'Overview',
            path: `${rootPath}/overview`
        }, {
            label: 'Tasks',
            path: `${rootPath}/tasks`
        }
    ])
    navigateTo(`${milestoneId}/overview`)
})
</script>

<template>
    <RouterView />
</template>