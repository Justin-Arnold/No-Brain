<script lang="ts" setup>
enum RootNodeType {
    PROJECT = 'Projects'
}

interface Node<T extends string = string> {
    label: T
    path: string
}

type NavItem = {
    label: string
    path: string
    icon?: string
}

defineProps<{
    navItems?: NavItem[]
}>()

type RootNode = Node<RootNodeType>

const route = useRoute();
const fullPath = computed(() => route.fullPath.split('/').filter((item) => item !== ''));

const rootNode = ref<RootNode>()
const additionalNodes = ref<Node[]>([])

watchEffect(async () => {
    if (fullPath.value[0].toLowerCase() === RootNodeType.PROJECT.toLowerCase()) {
        rootNode.value = {
            label: RootNodeType.PROJECT,
            path: RootNodeType.PROJECT.toLowerCase()
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
                path: project.value.id
            }]
        }
    }
})

const allNodes = computed((): any[] => {
    return [rootNode.value, ...additionalNodes.value]
});
</script>

<template>
    <div class="flex justify-between items-center bg-surface-800 rounded pr-4">
        <Breadcrumb :model="allNodes" :pt="{
            root: {
                class: '!bg-transparent'
            }
        }" />
        <div class="flex gap-2">
            <NuxtLink v-for="item in navItems" :key="item.label" class="p-2 text-gray-400" :to="item.path"
                active-class="!text-primary-400">
                {{ item.label }}
            </NuxtLink>
        </div>
    </div>
</template>