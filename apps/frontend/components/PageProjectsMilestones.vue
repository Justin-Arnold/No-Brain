<script lang="ts" setup>
import type { Milestone } from '~/types/milestone.types'

defineProps<{
    milestones?: Milestone[]
}>();

</script>

<template>
    <NuxtLayout name="card-list-layout">
        <BaseCard v-for="milestone in milestones" :key="milestone.id" class="aspect-square"
            :pt="{ body: { class: 'flex flex-col h-full' }, content: { class: 'grow' } }">
            <template #title>
                {{ milestone.name }}
            </template>
            <p>
                {{ milestone.description }}
            </p>
            <template #footer>
                <div class="flex gap-2 justify-end">
                    <BaseButton label="Edit" text></BaseButton>
                    <BaseButton label="Enter" @click="navigateTo('projects/' + milestone.id)"></BaseButton>
                </div>
            </template>
        </BaseCard>
    </NuxtLayout>
</template>