<script setup lang="ts">

const {data: tasks } = await useFetch('/api/tasks')

</script>

<template>
    <div>
        <div>
            <input type="text" v-model="newTask" placeholder="Add a new task">
            <button @click="addTask">Add</button>
            ---
            {{ tasks }}
        </div>
    </div>
</template>
