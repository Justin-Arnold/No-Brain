<script setup lang="ts">

const route = useRoute()
const { data: project, refresh } = useLazyFetch(`/api/projects/${route.params.projectId}`)


const newTask = ref('')

const addTask = async () => {
    const { data } = await useFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ name: newTask.value, projectId: route.params.projectId }),
    })
    refresh()
}

</script>

<template>
    <div class="p-4 flex flex-col gap-2">
        <input type="text" v-model="newTask" placeholder="Add a new task">
        <button @click="addTask">Add</button>
        <br/>
        <span v-for="task in project.tasks" class="bg-white/10 p-2 rounded">
            {{ task.name }}
        </span>
    </div>
</template>