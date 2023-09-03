<script setup lang="ts">

const user = useSupabaseUser();

const userID = computed(() => user.value?.id);

const {
    data: projects,
    pending,
    refresh,
} = await useFetch(`/api/projects`, {
    query: { id: userID },
});

function createArea() {
    console.log('new')
}

</script>


<template>
    <div v-if="!!projects?.length" class="grid grid-cols-auto-fill-200 lg:grid-cols-auto-fill-300 gap-4">
        <BaseCard v-for="project, index in projects" :key="index" class="aspect-square" :pt="{ body: { class: 'flex flex-col h-full'}, content: { class: 'grow'}}">
            <template #title>
                {{ project.name}}
            </template>
            <p>description text</p>
            <template #footer >
                <div class="flex gap-2 justify-end">
                    <BaseButton label="Edit" text></BaseButton>
                    <BaseButton label="Enter" @click="navigateTo('projects/' + project.id + '?id=' + userID)"></BaseButton>
                </div>
            </template>
        </BaseCard>
    </div>
    <div v-else class="h-full grid place-items-center">
        <div class="grid place-items-center gap-4">
            <h2 class="text-white">No areas yet.</h2>
            <BaseButton label="Create Area" text-only @click="createArea()"/>
        </div>
    </div>
</template>