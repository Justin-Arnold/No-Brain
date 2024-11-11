<script setup lang="ts">
const isOpen = defineModel<boolean>("open");
</script>

<template>
    <BaseDialogPrompt
        v-model:open="isOpen"
        title="Create a task"
        type="text"
        label="Task Name"
    />
</template>
