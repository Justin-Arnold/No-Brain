<script setup lang="ts">
import Button from "primevue/button";

defineProps<{
    label?: string;
    textOnly?: boolean;
    loading?: boolean;
    block?: boolean
}>();
</script>

<template>
    <Button :label="label" :text="textOnly" :loading="loading" :class="{'w-full': block}">
        <slot> </slot>
    </Button>
</template>
