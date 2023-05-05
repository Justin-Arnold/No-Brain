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
        class="w-60 bg-black/50 p-4 text-white flex flex-col gap-4 items-center flex-shrink-0"
    >
        <div
            class="flex gap-4 items-center cursor-pointer user-select-none"
            @click="navigateTo('/')"
        >
            <img src="~/assets/images/logo.png" class="h-12" />
            <h1 class="text-4xl font-bold">Planote</h1>
        </div>
        <nav class="flex-grow w-full">
            <div v-if="pending" height="2rem" class="mb-2"></div>
            <ul v-else class="flex flex-col gap-4">
                <li
                    v-for="each in projects"
                    :key="each.id"
                    class="bg-white/5 rounded text-center p-2 w-full"
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
