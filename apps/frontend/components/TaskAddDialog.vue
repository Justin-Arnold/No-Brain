<script setup lang="ts">
import type { Database } from '~/types/database.types';

type Task = Database['public']['Tables']['task']['Row']

defineProps<{
    options: Task[]
}>();
const isOpen = defineModel<boolean>("open");
</script>

<template>
    <BaseDialogPrompt v-model:open="isOpen" title="Add a task" type="select" :options="options" label="Task Name"
        option-label="name" />
</template>
