<script setup lang="ts">

const {data: projects, pending, refresh  } = useLazyFetch('/api/projects')

const client = useSupabaseAuthClient()

const newProject = async () => {
    const { data } = await useLazyFetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({ name: 'New Project' })
    })
    refresh()
}

</script>

<template>
    <div class="w-60 bg-black/50 p-4 text-white flex flex-col gap-4 items-center">
        <div class="flex gap-4 items-center cursor-pointer user-select-none" @click="navigateTo('/')">
            <img src="~/assets/images/logo.png"  class="h-12"/>
            <h1 class="text-4xl font-bold">
                Planet
            </h1>
        </div>
        <nav class="grow">
            <div v-if="pending" height="2rem" class="mb-2"></div>
            <ul v-else class="flex flex-col gap-4">
                <li v-for="each in projects" :key="each.id" class="bg-white/5 rounded text-center p-2">
                    <NuxtLink :to="`/projects/${each.id}`">{{ each.name }}</NuxtLink>
                </li>
                <button @click="newProject" class=" text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-600">Add +</button>
            </ul>
        </nav>
        <button class="mt-auto text-center text-white/50" @click="client.auth.signOut()">Logout</button>
    </div>
</template>