<script setup lang="ts">
import Menu from "primevue/menu";
import type { MenuItem } from "primevue/menuitem";

// ====================
// Component API
// ====================
defineProps<{
    items: MenuItem[];
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
