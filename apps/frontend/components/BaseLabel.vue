<script lang="ts" setup>

defineProps<{
    for?: string
    label?: string
}>()
</script>

<template>
    <FloatLabel variant="in">
        <slot></slot>
        <label :for="for">
            {{ label }}
        </label>
    </FloatLabel>
</template>