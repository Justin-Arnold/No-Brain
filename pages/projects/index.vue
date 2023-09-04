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

async function createProject() {
    const resp = await useFetch(`/api/projects`, {
        method: "POST",
        body: JSON.stringify({
            name: "New Project",
            userId: userID.value,
        }),
    });
    refresh();
}



</script>


<template>
    <NuxtLayout name="card-list-layout">
        <BaseCard v-for="project, index in projects" :key="index" class="aspect-square" :pt="{ body: { class: 'flex flex-col h-full'}, content: { class: 'grow'}}">
            <template #title>
                {{ project.name }}
            </template>
            <p>description text</p>
            <template #footer >
                <div class="flex gap-2 justify-end">
                    <BaseButton label="Edit" text></BaseButton>
                    <BaseButton label="Enter" @click="navigateTo('projects/' + project.id + '?id=' + userID)"></BaseButton>
                </div>
            </template>
        </BaseCard>
        <template #bottomButton>
            <BaseButton label="Create Project" text-only @click="createProject()"/>
        </template>
    </NuxtLayout>
</template>