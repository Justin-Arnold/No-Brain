<script setup lang="ts">

const route = useRoute()
const { data: project } = useLazyFetch(`/api/projects/${route.params.projectId}`)

</script>

<template>
    <div>
        <span v-for="task in project.tasks">
            {{ task.name }}
        </span>
    </div>
</template>