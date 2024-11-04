<script lang="ts" setup>
enum RootNodeType {
    PROJECT = 'Projects'
}

interface Node<T extends string = string> {
    label: T
    path: string
}

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
    <Breadcrumb :model="allNodes"></Breadcrumb>
</template>