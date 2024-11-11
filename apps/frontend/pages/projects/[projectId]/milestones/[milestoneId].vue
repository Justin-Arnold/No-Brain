<script lang="ts" setup>
const route = useRoute();
const milestoneId = route.params.milestoneId as string;

const { data: milestone } = await useFetch(`/api/milestones/${milestoneId}`);

function confirmDelete() {}

const menu = ref();

const AddTaskMenuItems = ref([
    {
        label: "Task Options",
        items: [
            {
                label: "Create Task",
            },
            {
                label: "Add Existing Task",
            },
        ],
    },
]);

const toggleAddTaskMenu = (event: Event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <NuxtLayout name="overview">
        <template #header>
            <OverviewHeader
                :title="milestone!.name"
                :description="milestone?.description ?? undefined"
            />
        </template>
        <template #header_action-bar>
            <div class="card relative flex justify-center">
                <div
                    aria-haspopup="true"
                    aria-controls="overlay_menu"
                    @click="toggleAddTaskMenu"
                >
                    <IconTaskAdd class="hover:text-primary" />
                </div>
                <Menu
                    id="overlay_menu"
                    ref="menu"
                    :model="AddTaskMenuItems"
                    :popup="true"
                />
            </div>
            <Icon
                name="mdi:trash"
                size="24"
                class="flex-shrink-0 cursor-pointer transition-colors duration-300 hover:text-red-400"
                @click="confirmDelete">
            </Icon>
            <BaseConfirmDialog />
        </template>
    </NuxtLayout>
</template>