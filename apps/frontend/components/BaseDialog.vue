<script setup lang="ts">
import Dialog from 'primevue/dialog';

defineProps<{
    title: string
}>()

const isOpen = defineModel<boolean>()
</script>

<template>
    <Dialog v-model:visible="isOpen" modal :header="title">
        <slot></slot>
    </Dialog>
</template>
