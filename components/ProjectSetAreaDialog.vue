<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { Area } from '@prisma/client';

const user = useSupabaseUser();

const userID = computed(() => user.value?.id);

const {
    data: areas,
    pending,
    refresh,
} = await useFetch(`/api/areas`, {
    query: { id: userID },
});

const selectedArea = ref<Area>(null);

watch(selectedArea, async () => {
    console.log(selectedArea.value.id)
    const resp = await useFetch(`/api/projects/${props.projectId}`, {
        method: "PUT",
        body: {
            "area_id": selectedArea.value.id,
        },
    });
});

const props = defineProps<{
    projectId: string;
}>();
</script>

<template>
    <BaseDialog modal header="Set Area">
        <div class="w-60">
            <Dropdown :options="areas || []" option-label="name" class="w-full" v-model="selectedArea"/>
        </div>
    </BaseDialog>
</template>