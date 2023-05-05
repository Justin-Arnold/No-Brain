<script setup lang="ts">
// ==============================
// Component API
// ==============================
const emit = defineEmits<{
    "edit-name": [void];
    delete: [void];
}>();

// ==============================
// Content
// ==============================
const STRINGS = {
    EDIT_NAME_ACTION: "Edit Project Name",
    DELETE_ACTION: "Delete Project",
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
]);

const toggle = (event: any) => {
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
