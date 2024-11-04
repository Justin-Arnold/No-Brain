<script lang="ts" setup>
import FloatLabel from 'primevue/floatlabel';

defineProps<{
    for?: string
    label?: string
}>()
</script>

<template>
    <component :is="label ? FloatLabel : 'div'" variant="in">
        <slot></slot>
        <label :for="for">
            {{ label }}
        </label>
    </component>
</template>