<script lang="ts" setup>

const route = useRoute();
const milestoneId = route.params.milestoneId as string;

const { data: milestone, refresh } = await useFetch(
    `/api/milestones/${milestoneId}`,
);


const rootPath = route.fullPath

function confirmDelete() {

}

onMounted(() => {
    console.log('z', rootPath)
})
</script>

<template>
    <NuxtLayout name="overview">
        <template #header>
            <OverviewHeader :title="milestone!.name" :description="milestone?.description ?? undefined" />
        </template>
        <template #header_action-bar>
            <Icon name="mdi:trash" size="24"
                class="flex-shrink-0 hover:text-red-400 transition-colors duration-300 cursor-pointer"
                @click="confirmDelete">
            </Icon>
            <BaseConfirmDialog />
        </template>
    </NuxtLayout>
</template>