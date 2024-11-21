<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
});

const route = useRoute()

const rootPath = route.fullPath

onMounted(() => {
    const milsetoneId = route.params.milestoneId
    navigateTo(`${milsetoneId}/overview`)
})

const setNavItems = inject('setNavItems')

onMounted(() => {
    setNavItems([
        {
            label: 'Overview',
            path: `${rootPath}/overview`
        }, {
            label: 'Tasks',
            path: `${rootPath}/tasks`
        }
    ])
})

</script>

<template>
    <div class="flex h-full flex-col gap-8 overflow-hidden">
        <RouterView></RouterView>
    </div>
</template>