<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
})
const {data: tasks, refresh } = await useFetch('/api/tasks')
const {data: projects } = await useFetch('/api/projects')
const client = useSupabaseAuthClient()

const newTask = ref('')

const newProject = async () => {
    const { data } = await useLazyFetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify({ name: 'New Project' })
    })
    refresh()
}

</script>

<template>
    <div class="h-screen w-screen fixed top-0 left-0 flex bg-gray-800 overflow-none">
        <div class="w-60 bg-black/50 p-4 text-white">
            <div class="flex gap-4 items-center cursor-pointer user-select-none" @click="navigateTo('/')">
                <img src="~/assets/images/logo.png"  class="h-12"/>
                <h1 class="text-4xl font-bold">
                    Planet
                </h1>
            </div>
            <nav class="mt-8">
                <ul class="flex flex-col gap-4">
                    <li v-for="each in projects" :key="each.id" class="bg-white/5 rounded text-center p-2">
                        <NuxtLink :to="`/projects/${each.id}`">{{ each.name }}</NuxtLink>
                    </li>
                    <button @click="newProject" class=" text-center text-white/50">Add +</button>
                </ul>
            </nav>
            <button class="mt-auto text-center text-white/50" @click="client.auth.signOut()">Logout</button>
        </div>
        <div class="grow">
            <NuxtPage></NuxtPage>
        </div>
    </div>
</template>
