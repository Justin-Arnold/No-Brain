<script setup lang="ts">

const route = useRoute()
const { data: project, refresh } = await useFetch(`/api/projects/${route.params.projectId}`)
const { data: parto } = await useFetch('/api/tasks')
console.log(parto)


const newTask = ref('')

const addTask = async () => {
    const { data } = await useFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ name: newTask.value, projectId: route.params.projectId }),
    })
    refresh()
}

const updateTask = async (id: string, name: string, completed: boolean) => {
    const { data } = await useFetch(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name: name, completed: !completed }),
    })
    refresh()
}

</script>

<template>
    <div class="p-4 h-full flex flex-col gap-4">
        <input type="text" v-model="newTask" placeholder="Add a new task">
        <button @click="addTask">Add</button>
        <div class="overflow-y-auto flex flex-col gap-2">
            <span v-for="task in project.tasks" class="bg-white/10 p-2 rounded flex justify-between gap-4" :class="{'line-through opacity-50': task.completed}">
                <span>{{ task.name }}</span><input type="checkbox" :checked="task.completed" @change="updateTask(task.id, task.name, task.completed)"/>
            </span>
        </div>
    </div>
</template>