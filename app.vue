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

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
