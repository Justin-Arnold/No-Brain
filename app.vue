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

</script>

<template>
    <div>
        <div>
            <input type="text" v-model="newTask" placeholder="Add a new task">
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
            </div>
        </div>
    </div>
</template>
