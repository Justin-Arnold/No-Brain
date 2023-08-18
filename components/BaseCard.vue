<script setup lang="ts">
import Card from 'primevue/card';

defineSlots<{
    default(): any
    title(): any
    footer(): any
}>()
</script>

<template>
    <Card>
        <template #title>
            <slot name="title"></slot>
        </template>
        <template #content>
            <slot></slot>
        </template>
        <template #footer>
            <slot name="footer"></slot>
        </template>
    </Card>
</template>