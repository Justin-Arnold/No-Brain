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
</script>

<template>
    <PageHome />
</template>