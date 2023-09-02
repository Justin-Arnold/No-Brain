<script setup lang="ts">
definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});

const client = useSupabaseAuthClient();
const user = useSupabaseUser();

const userID = computed(() => user.value?.id);

const {
    data: projects,
    pending,
    refresh,
} = await useFetch(`/api/projects`, {
    query: { id: userID },
});

</script>
<template>
    <h1 class="text-white">Projects</h1>

    <ul class="flex flex-col gap-4">
        <li v-for="each in projects" :key="each.id">
            <NuxtLink

                :to="`/projects/${each.id}` + '?id=' + userID"
                class="w-full rounded bg-white/5 p-2 text-center inline-block hover:bg-purple-200/50"
                active-class="text-purple-300"
            >
                {{ each.name }}
            </NuxtLink>
        </li>
    </ul>
    ---
    <RouterView></RouterView>
</template>