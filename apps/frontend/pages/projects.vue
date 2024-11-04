<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});
</script>

<template>
    <div class="flex flex-col gap-8 h-full overflow-hidden">
        <BaseBreadCrumbBar />
        <RouterView></RouterView>
    </div>
</template>