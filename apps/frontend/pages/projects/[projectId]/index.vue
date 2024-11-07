<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
});

const route = useRoute()

onMounted(() => {
    const projectId = route.params.projectId
    navigateTo(`${projectId}/overview`)
})

const setNavItems = inject('setNavItems')

setNavItems([
    {
        label: 'Overview',
        path: 'overview'
    }, {
        label: 'Tasks',
        path: 'tasks'
    }
])
</script>

<template>
    <div class="flex h-full flex-col gap-8 overflow-hidden">
        <RouterView></RouterView>
    </div>
</template>