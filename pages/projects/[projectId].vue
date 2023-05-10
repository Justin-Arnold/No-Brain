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
    <div class="flex h-full">
        <div class="p-4 h-full flex flex-col gap-4 w-1/3 flex-shrink-0">
            <input type="text" v-model="newTask" placeholder="Add a new task">
            <button @click="addTask">Add</button>
            <div class="overflow-y-auto flex flex-col gap-2">
                <span v-for="task in project.tasks" class="bg-white/10 p-2 rounded flex justify-between gap-4" :class="{'line-through opacity-50': task.completed}">
                    <span>{{ task.name }}</span><input type="checkbox" :checked="task.completed" @change="updateTask(task.id, task.name, task.completed)"/>
                </span>
            </div>
        </div>
        <div class="p-4 h-full flex flex-col gap-4">
            <input type="text" v-model="newTask" placeholder="Add a new task">
            <button @click="addTask">Add</button>
            <div class="overflow-y-auto flex flex-col gap-2">
                <span v-for="note in project.notes" class="bg-white/10 p-2 rounded flex flex-col justify-between gap-4">
                    <span class="text-lg font-semibold">{{ note.name }}</span>
                    <span>{{ note.content }}</span>
                </span>
            </div>
        </div>
    </div>
</template>