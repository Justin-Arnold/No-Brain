<script setup lang="ts">
////////////
// Page Data
////////////
definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});
/////////////////
// Navigation Bar
/////////////////
const navigationStore = usePageNavigationStore()

navigationStore.setNavItems([])
navigationStore.setActionItems([{
    label: 'Create New Project',
    action: () => {
        createProjectModalIsOpen.value = true
    }
}])

/////////////////
// Create Project
/////////////////
const createProjectModalIsOpen = ref(false)

function onSaveNewProject() {
    createProjectModalIsOpen.value = false
    refresh()
}
/////////////////
// Project Data
/////////////////
const user = useSupabaseUser();

const userID = computed(() => user.value?.id);

const {
    data: projects,
    refresh
} = await useFetch(`/api/projects`, {
    query: { id: userID },
});
</script>

<template>
    <PageProjects :page-navigation-items="navigationStore.navItems" :projects="projects || undefined" />
    <ProjectCreateDialog v-model="createProjectModalIsOpen" @save="onSaveNewProject" />
</template>