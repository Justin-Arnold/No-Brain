<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

const user = useSupabaseUser();
const userID = computed(() => user.value?.id);

const {
    data: areas,
    pending,
    refresh,
} = await useFetch(`/api/areas`, {
    query: { id: userID },
});

const selectedArea = ref(null);

const emit = defineEmits<{
    'change': [string]
}>()

watch(selectedArea, async () => {
    if (!selectedArea.value) {
        return
    }
    const resp = await useFetch(`/api/projects/${props.projectId}`, {
        method: "PUT",
        body: {
            "area_id": selectedArea.value.id,
        },
    });
    console.log(resp)
    emit('change', selectedArea.value.name)
});

const props = defineProps<{
    projectId: string;
}>();
</script>

<template>
    <BaseDialog modal title="Set Area">
        <div class="w-60">
            <Dropdown :options="areas || []" option-label="name" class="w-full" v-model="selectedArea" />
        </div>
    </BaseDialog>
</template>