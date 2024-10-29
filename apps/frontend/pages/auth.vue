<script setup lang="ts">
import BaseFlipper from '~/components/BaseFlipper.vue';

definePageMeta({
    layout: 'centered-viewport-layout',
});

const isFlipped = ref(false);
const flip = () => useToggle(isFlipped);

</script>

<template>
    <BaseFlipper :isFlipped="isFlipped">
        <template #front>
            <AuthCardLogin @change-mode="flip"/>
        </template>
        <template #back>
            <AuthCardSignup @change-mode="flip"/>
        </template>
    </BaseFlipper>
</template>

