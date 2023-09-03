<script setup lang="ts">

definePageMeta({
    middleware: "authentication",
    layout: "app-layout",
});

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
    <h1 class="text-white">Areas</h1>
    <hr/>
    <div v-if="!!areas.length" class="grid grid-cols-auto-fill-200 lg:grid-cols-auto-fill-300 gap-4">
        <BaseCard v-for="area, index in areas" :key="index" class="aspect-square" :pt="{ body: { class: 'flex flex-col h-full'}, content: { class: 'grow'}}">
            <template #title>
                {{ area.name}}
            </template>
            <p>description text</p>
            <template #footer>
                <BaseButton label="Edit"></BaseButton>
            </template>
        </BaseCard>
    </div>
    <div v-else class="h-full grid place-items-center">
        <div class="grid place-items-center gap-4">
            <h2 class="text-white">No areas yet.</h2>
            <BaseButton label="Create Area" text-only @click="createArea()"/>
        </div>
    </div>
</template>