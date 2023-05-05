<script setup lang="ts">
import Button from "primevue/button";

defineProps<{
    label?: string;
    textOnly?: boolean;
}>();
</script>

<template>
    <Button :label="label" :text="textOnly">
        <slot> </slot>
    </Button>
</template>
