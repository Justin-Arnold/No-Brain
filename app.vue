<script setup lang="ts">

const {data: tasks, refresh } = await useFetch('/api/tasks')
const {data: projects } = await useLazyFetch('/api/projects')

const newTask = ref('')

const addTask = async () => {
    const { data } = await useLazyFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ name: newTask.value })
    })
    refresh()
}

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
            <h1 class="text-3xl">Projects</h1>
            <nav class="mt-4">
                <ul class="flex flex-col gap-4">
                    <li v-for="each in projects" :key="each.id" class="bg-white/5 rounded text-center p-2">
                        <NuxtLink :to="`/projects/${each.id}`">{{ each.name }}</NuxtLink>
                    </li>
                    <button @click="newProject" class=" text-center text-white/50">Add +</button>
                </ul>
            </nav>
        </div>
        <div class="grow">
            <NuxtPage></NuxtPage>
            <!-- <input type="text" v-model="newTask" placeholder="Add a new task">
            <button @click="addTask">Add</button>
            <br/>
            <div v-for="each in tasks" :key="each.id">
                {{ each.name }}
            </div>
            <br/>
            Projects:
            <div v-for="each in projects" :key="each.id">
                {{ each.name }}
                <br/>
                <span v-for="task in each.tasks">{{ task.name }}</span>
            </div> -->
        </div>
    </div>
</template>
