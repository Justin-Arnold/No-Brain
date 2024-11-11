<script lang="ts" setup>
defineProps<{
    title: string
    description?: string
}>();
</script>

<template>
    <h1 class="text-4xl">
        {{ title }}
    </h1>
    <span v-if="description" class="text-lg">
        {{ description }}
    </span>
</template>