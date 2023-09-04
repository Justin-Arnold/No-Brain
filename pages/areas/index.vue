<script setup lang="ts">
const user = useSupabaseUser();

const userID = computed(() => user.value?.id);

const {
    data: areas,
    pending,
    refresh,
} = await useFetch(`/api/areas`, {
    query: { id: userID },
});

async function createArea() {
    const resp = await useFetch(`/api/areas`, {
        method: "POST",
        body: JSON.stringify({
            name: "New Area",
            userId: userID.value,
        }),
    });
    refresh();
}
</script>

<template>
    <NuxtLayout name="card-list-layout">
        <BaseCard v-for="area, index in areas" :key="index" class="aspect-square" :pt="{ body: { class: 'flex flex-col h-full'}, content: { class: 'grow'}}">
            <template #title>
                {{ area.name}}
            </template>
            <p>{{area.description}}</p>
            <template #footer >
                <div class="flex gap-2 justify-end">
                    <BaseButton label="Edit" text></BaseButton>
                    <BaseButton label="Enter" @click="navigateTo('/areas/test')"></BaseButton>
                </div>
            </template>
        </BaseCard>
        <template #bottomButton>
            <BaseButton label="Create Area" text-only @click="createArea()"/>
        </template>
    </NuxtLayout>
</template>