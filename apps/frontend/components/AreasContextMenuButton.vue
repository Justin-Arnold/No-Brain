<script setup lang="ts">
// ==============================
// Component API
// ==============================
const emit = defineEmits<{
    "edit-name": [void];
}>();

// ==============================
// Content
// ==============================
const STRINGS = {
    EDIT_NAME_ACTION: "Edit Area Name",
};

// ==============================
// Popup Menu
// ==============================
const menuTemplateRef = ref();

const items = ref([
    {
        label: STRINGS.EDIT_NAME_ACTION,
        command: () => emit("edit-name"),
    },
]);
</script>

<template>
    <BaseContextMenuButton
        :items="items"
    />
</template>
