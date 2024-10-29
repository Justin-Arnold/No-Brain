<script setup lang="ts">
import { on } from 'events';


definePageMeta({
    middleware: "authentication",
});

const route = useRoute();
const areaId = route.params.areaId;
const userID = route.query.id;
const { data: area, refresh } = await useFetch(
    `/api/areas/${areaId}`,
    {
        query: { id: userID },
    },
);
const addingProject = ref(false);

onMounted(() => {
    console.log(area.value)
})

function updateAreaName(name: string) {
    const resp = useFetch(`/api/areas/${areaId}`, {
        method: "PUT",
        body: {
            name: name,
        },
    });
}
</script>

<template>
    <div class="flex justify-between items-center">
        <BaseInputText :value="area.name" class="!text-3xl !border-none !outline-none !shadow-none !pl-0" @blur="updateAreaName($event.target.value)"></BaseInputText>
        <AreasContextMenuButton />
    </div>
    <p class=" p-2 rounded bg-[var(--highlight-bg)]">
        {{ area.description  || "No description"}}
    </p>
    <div class="flex justify-start items-baseline">
        <h2>
            Projects
        </h2>
        <BaseButton label="Add Project" text-only @click="addingProject = true"></BaseButton>
        <BaseDialog v-model:visible="addingProject" header="Add Project" modal>
            <div class="w-40">test</div>
        </BaseDialog>
    </div>
    <div class=" w-full flex gap-2">
        <BaseCard v-for="project, index in area.projects" :key="index" class="aspect-square" :pt="{ body: { class: 'flex flex-col h-full'}, content: { class: 'grow'}}">
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
    </div>
</template>