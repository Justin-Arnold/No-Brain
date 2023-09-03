<template>
    <div>
        <NuxtLayout>
            <NuxtPage></NuxtPage>
        </NuxtLayout>
        <AppGrainTexture />
    </div>
</template>

<style>

body {
    @apply bg-[var(--surface-ground)];
}

h1 {
    @apply text-5xl font-bold;
}

h2 {
    @apply text-3xl font-bold;
}

hr {
    @apply mt-2 mb-4
}
</style>
