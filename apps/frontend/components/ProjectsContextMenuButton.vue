<script setup lang="ts">
// ==============================
// Component API
// ==============================
const emit = defineEmits<{
    "edit-name": [void];
    delete: [void];
    "set-area": [void];
}>();

// ==============================
// Content
// ==============================
const STRINGS = {
    EDIT_NAME_ACTION: "Edit Project Name",
    DELETE_ACTION: "Delete Project",
    SET_AREA_ACTION: "Set Area",
    CONFIRM_DELETE_PROJECT: "Are you sure you want to delete this project?",
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
    {
        label: STRINGS.DELETE_ACTION,
        command: () => emit("delete"),
    },
    {
        label: STRINGS.SET_AREA_ACTION,
        command: () => emit("set-area"),
    },
]);
</script>

<template>
    <BaseContextMenuButton
        :items="items"
    />
</template>
