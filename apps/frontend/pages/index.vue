<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});

/////////////////
// Navigation Bar
/////////////////
const navigationStore = usePageNavigationStore()

navigationStore.setNavItems([])
navigationStore.setActionItems([])
</script>

<template>
    <PageHome />
</template>