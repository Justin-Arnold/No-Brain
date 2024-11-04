<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";

defineProps<{
    items: MenuItem[];
}>();

const menuTemplateRef = ref();

const toggle = (event: MouseEvent) => {
    menuTemplateRef.value.ref.toggle(event); // TODO - Clean up this ref passthrough
};

</script>
<template>
    <BaseButton type="button" text @click="toggle">
        <Icon name="iconamoon:options" size="1.8rem" />
    </BaseButton>
    <BaseMenu
        id="overlay_menu"
        ref="menuTemplateRef"
        :items="items"
        :popup="true"
    />
    <!-- <BaseButton label="Delete Project" severity="danger"  size="small" @click="confirmDelete($event)"/>
        <ConfirmPopup></ConfirmPopup> -->
</template>