<script lang="ts" setup>
import type { string } from 'zod';

enum RootNodeType {
    PROJECT = 'Projects',
    HOME = 'Home'
}

export type NavItem = {
    label: string
    path: string
    icon?: string
}

export type ActionItem = {
    label: string
    action: () => void
    icon?: string
}

interface Node<T extends string = string> {
    label?: T
    route: string
    icon?: string
}

defineProps<{
    navItems?: NavItem[]
    actionItems?: ActionItem[]
}>()

type RootNode = Node<RootNodeType>
type HomeNode = Node<RootNodeType>

const route = useRoute();
const fullPath = computed(() => route.fullPath.split('/').filter((item) => item !== ''));

const rootNode = ref<RootNode>()
const homeNode = ref<HomeNode>()

const additionalNodes = ref<Node[]>([])

watchEffect(async () => {
    homeNode.value = {
        route: '/',
        icon: 'line-md:home-twotone'
    }

    if (fullPath.value.length === 0) {
        rootNode.value = undefined
        return
    }

    if (fullPath.value[0].toLowerCase() === RootNodeType.PROJECT.toLowerCase()) {
        rootNode.value = {
            label: RootNodeType.PROJECT,
            route: `/${RootNodeType.PROJECT.toLowerCase()}`
        }

        if (fullPath.value[1]) {
            const project = await useProject(fullPath.value[1])

            if (!project.value) {
                throw createError({
                    status: 404,
                    statusMessage: 'Project not found'
                })
            }

            additionalNodes.value = [{
                label: project.value.name,
                route: project.value.id
            }]
        } else {
            additionalNodes.value = []
        }
    }
})

const allNodes = computed((): any[] => {
    if (!rootNode.value) {
        return []
    }
    return [rootNode.value, ...additionalNodes.value]
});
</script>

<template>
    <div class="flex justify-between items-center bg-surface-800 rounded pr-4">
        <Breadcrumb :home="homeNode" :model="allNodes" :pt="{
            root: {
                class: '!bg-transparent'
            }
        }">
            <template #item="{ item }">
                <NuxtLink :to="item.route" class="text-gray-400">
                    {{ item.label }}
                    <Icon v-if="item.icon" :name="item.icon" size="20px" />
                </NuxtLink>
            </template>
        </Breadcrumb>
        <div class="flex gap-2">
            <NuxtLink v-for="item in navItems" :key="item.label" class="p-2 text-gray-400" :to="item.path"
                active-class="!text-primary-400">
                {{ item.label }}
            </NuxtLink>
            <BaseButton v-for="action in actionItems" :key="action.label" @click="action.action" :label="action.label"
                text-only />
        </div>
    </div>
</template>