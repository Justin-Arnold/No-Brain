<template>
    <!-- <div class="h-full overflow-hidden grid grid-cols-3 gap-4">
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
</div> -->
    <RouterView />
</template>
