<script lang="ts" setup generic="T">
import BaseLabel from "~/components/BaseLabel.vue";

defineProps<{
    options: T[];
    name?: string;
    label?: string;
    optionLabel?: string;
    placeholder?: string;
}>();

const selectedValue = defineModel<T>();
</script>

<template>
    <BaseLabel :for="name" :label="label">
        <Select
            v-model="selectedValue"
            :name="name"
            :options="options"
            :option-label="optionLabel"
            :placeholder="placeholder"
        />
    </BaseLabel>
</template>
