<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';

definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});

const route = useRoute();
const fullPath = computed(() => route.fullPath.split('/').filter((item) => item !== ''));

const breadcrumbItems = computed(() => {
    return fullPath.value.map((item) => {
        return {
            label: toTitleCase(item),
            to: `/${item}`,
        };
    })
});

function toTitleCase(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}



</script>
<template>
    <div class="flex flex-col gap-8 h-full">
        <Breadcrumb :model="breadcrumbItems"></Breadcrumb>
        <RouterView></RouterView>
    </div>
</template>