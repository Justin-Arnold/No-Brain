<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
})

</script>

<template>
    <NuxtLayout name="app-view">
        <p class="text-5xl font-bold text-white">Welcome!</p>
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>