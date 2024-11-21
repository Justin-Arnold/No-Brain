<!-- <script setup lang="ts">



const createProjectModalIsOpen = ref(false)

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
    
</template> -->

<script setup lang="ts">
import type { NavItem } from '~/components/BaseBreadCrumbBar.vue';


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

/////////////////
// Project Data
/////////////////
const user = useSupabaseUser();

const userID = computed(() => user.value?.id);

const {
    data: projects,
} = await useFetch(`/api/projects`, {
    query: { id: userID },
});

</script>

<template>
    <PageProjects :page-navigation-items="navigationStore.navItems" :projects="projects || undefined" />
</template>