<script setup lang="ts">

defineProps<{
    label: string
}>()

</script>

<template>
    <Tag :value="label" />
</template>