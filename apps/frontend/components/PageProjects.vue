<script lang="ts" setup>
import type { NavItem } from './BaseBreadCrumbBar.vue';
import type { Project } from '~/types/Project.types'

defineProps<{
    pageNavigationItems: NavItem[]
    projects?: Project[]
}>();

</script>

<template>
    <NuxtLayout name="card-list-layout">
        <BaseCard v-for="project in projects" :key="project.id" class="aspect-square"
            :pt="{ body: { class: 'flex flex-col h-full' }, content: { class: 'grow' } }">
            <template #title>
                {{ project.name }}
            </template>
            <p>
                {{ project.description }}
            </p>
            <template #footer>
                <div class="flex gap-2 justify-end">
                    <BaseButton label="Edit" text></BaseButton>
                    <BaseButton label="Enter" @click="navigateTo('projects/' + project.id)"></BaseButton>
                </div>
            </template>
        </BaseCard>
        <!-- <template #bottomButton>
            <BaseButton label="Create Project" text-only @click="createProjectModalIsOpen = true" />
        </template>
        <ProjectCreateDialog v-model="createProjectModalIsOpen" /> -->
    </NuxtLayout>
</template>