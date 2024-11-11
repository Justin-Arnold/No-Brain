<script lang="ts" setup>
const route = useRoute();
const milestoneId = route.params.milestoneId as string;
const projectId = route.params.projectId as string;

const { data: milestone } = await useFetch(`/api/milestones/${milestoneId}`);

function confirmDelete() { }
const menu = ref();

const AddTaskMenuItems = ref([
  {
    label: "Task Options",
    items: [
      {
        label: "Create Task",
        command: () => {
          taskCreateDialogOpen.value = true;
        },
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

function onConfirmCreateTask(value: string) {
  addTask(value);
  taskCreateDialogOpen.value = false;
}

async function addTask(taskName: string) {
  await useFetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify({
      name: taskName,
      projectId,
      milestoneId,
    }),
  });
}

const taskCreateDialogOpen = ref(false);
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
          @click="confirmDelete"
      />
      <BaseConfirmDialog />
      <TaskCreateDialog
          v-if="taskCreateDialogOpen"
          v-model:open="taskCreateDialogOpen"
          @cancel="() => (taskCreateDialogOpen = false)"
          @confirm="onConfirmCreateTask"
      />
    </template>
  </NuxtLayout>
</template>
