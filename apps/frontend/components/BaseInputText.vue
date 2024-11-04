<script setup lang="ts">
import BaseLabel from "./BaseLabel.vue";

defineProps<{
    label?: string
    name?: string
    errors?: [] | string
    type?: string
}>()

const value = defineModel<string>()
</script>

<template>
    <div class="flex flex-col gap-2">
        <BaseLabel :for="name" :label="label">
            <InputText :id="name" :name="name" :invalid="!!errors" class="w-full" v-model="value" :type="type" />
        </BaseLabel>
        <Message v-if="errors" severity="error" variant="simple" size="small">
            {{ errors }}
        </Message>
    </div>
</template>
