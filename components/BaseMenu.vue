<script setup lang="ts">
import Menu from "primevue/menu";

// ====================
// Component API
// ====================
defineProps<{
    items: any[]; // TODO - remove any
    popup: boolean;
}>();

const menu = ref<Menu>();

defineExpose({
    ref: menu,
});
</script>

<template>
    <Menu ref="menu" :model="items" popup />
</template>
