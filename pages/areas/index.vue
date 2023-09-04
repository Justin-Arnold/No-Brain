<script setup lang="ts">
const areas = ref<any>([{
        name: "Fitness"
    },{
        name: "Mental Health"
    }, {
        name: "Diet"
    }, {
        name: "Finances"
    }, {
        name: "Music"
    }, {
        name: "Software Engineering"
    }, {
        name: "Pets"
    }, {
        name: "Plants"
    }])

function createArea() {
    areas.value.push({
        name: "New Area"
    })
}
</script>

<template>
    <NuxtLayout name="card-list-layout">
        <BaseCard v-for="area, index in areas" :key="index" class="aspect-square" :pt="{ body: { class: 'flex flex-col h-full'}, content: { class: 'grow'}}">
            <template #title>
                {{ area.name}}
            </template>
            <p>description text</p>
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