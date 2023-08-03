<script setup lang="ts">
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

const newProject = async () => {
    const { data, error } = await useFetch("/api/projects", {
        method: "POST",
        body: { name: "New Project", userId: userID.value },
    });
    if (error) {
        //
    } else if (data) {
        //
    }
    refresh();
};

async function signOut() {
    await client.auth.signOut();
    navigateTo("/login");
}

const nuxtApp = useNuxtApp();
// if already provided, remove it
if (!nuxtApp.$refreshSidebar) {
    nuxtApp.provide("refreshSidebar", refresh);
}
</script>

<template>
    <div
        class="flex w-60 flex-shrink-0 flex-col items-center gap-4 bg-black/50 p-4 text-white"
    >
        <div
            class="user-select-none flex cursor-pointer items-center gap-4"
            @click="navigateTo('/')"
        >
            <img src="~/assets/images/logo.png" class="h-12" />
            <h1 class="text-4xl font-bold">Planote</h1>
        </div>
        <nav class="w-full flex-grow">
            <div v-if="pending" height="2rem" class="mb-2"></div>
            <ul v-else class="flex flex-col gap-4">
                <li
                    v-for="each in projects"
                    :key="each.id"
                    class="w-full rounded bg-white/5 p-2 text-center"
                >
                    <NuxtLink
                        :to="`/projects/${each.id}` + '?id=' + userID"
                        active-class="text-purple-300"
                        >{{ each.name }}</NuxtLink
                    >
                </li>
                <BaseButton label="Add" text-only @click="newProject" />
            </ul>
        </nav>
        <BaseButton label="Logout" @click="signOut" />
    </div>
</template>
