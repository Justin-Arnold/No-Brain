<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});

const projectNavItems = ref([])

function setNavItems(items) {
    projectNavItems.value = items
}

provide('setNavItems', setNavItems)
</script>

<template>
    <div class="flex h-full flex-col gap-8 overflow-hidden">
        <BaseBreadCrumbBar :nav-items="projectNavItems" />
        <RouterView></RouterView>
    </div>
</template>