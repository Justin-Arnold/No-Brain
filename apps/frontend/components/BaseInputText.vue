<script setup lang="ts">
import InputText from "primevue/inputtext";
import BaseLabel from "./BaseLabel.vue";

defineProps<{
    label?: string
    name?: string
}>()

const value = defineModel<string>()
</script>

<template>
    <BaseLabel :for="name" :label="label">
        <InputText :id="name" :name="name" class="w-full" v-model="value" />
    </BaseLabel>
</template>
