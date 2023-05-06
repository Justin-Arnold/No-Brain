<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
})

</script>

<template>
    <NuxtLayout name="app-view">
        <NuxtPage></NuxtPage>
    </NuxtLayout>
</template>
