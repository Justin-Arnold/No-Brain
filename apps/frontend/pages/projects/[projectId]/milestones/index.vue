<script setup lang="ts">
import { ZodError } from "zod";
import type { Database } from "~/types/database.types";

definePageMeta({
    middleware: "authentication",
});

type Status = Database['public']['Enums']['status']
type Task = Database['public']['Tables']['task']['Row']

const route = useRoute();
const projectId = route.params.projectId as string;


const user = useSupabaseUser();
const userID = computed(() => user.value?.id);

const { data: project, refresh } = await useFetch(
    `/api/projects/${projectId}`,
    { query: { id: userID } },
);

const milestones = computed(() => {
    if (!project.value) {
        return []
    }

    if (!project.value.milestone) {
        return []
    }

    return project.value.milestone
})
</script>

<template>
    <div class="h-full overflow-hidden grid grid-cols-3 gap-4">
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
                    <BaseButton label="Enter" @click="navigateTo(`milestones/` + milestone.id)">
                    </BaseButton>
                </div>
            </template>
        </BaseCard>
    </div>
</template>