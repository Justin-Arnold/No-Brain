<script setup lang="ts">
import Button from "primevue/button";

defineProps<{
    label?: string;
    textOnly?: boolean;
    loading?: boolean;
}>();
</script>

<template>
    <Button :label="label" :text="textOnly" :loading="loading">
        <slot> </slot>
    </Button>
</template>
