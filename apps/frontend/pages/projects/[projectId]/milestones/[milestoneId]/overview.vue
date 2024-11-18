<script lang="ts" setup>
import type { Database } from '~/types/database.types';

const route = useRoute();
const milestoneId = route.params.milestoneId as string;
const projectId = route.params.projectId as string

type Task = Database['public']['Tables']['task']['Row']

const { data: milestone } = await useFetch(`/api/milestones/${milestoneId}`);

const { data: allTasks } = await useFetch(`/api/tasks/`);

const tasksWithNoMilestone = computed(() => {
  return allTasks.value!.filter(task => !task.milestone_id && task.project_id === projectId);
})

///////////////
// Delete
//////////////
const confirm = useConfirm()
const toast = useToast();

function confirmDelete() {
  confirm.require({
    header: 'Confirm Milestone Deletion',
    message: `Are you sure you want to delete "${milestone.value?.name}"?`,
    rejectLabel: 'cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete Milestone',
      severity: 'danger'
    },
    accept: () => {
      useFetch(`/api/milestones/${milestoneId}`, {
        method: "DELETE",
      }).then(() => {
        navigateTo("/projects");
        toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
      });
    },
  });
}
///////////////
// Delete
//////////////

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
        command: () => {
          taskAddDialogOpen.value = true;
        },
      },
    ],
  },
]);

const toggleAddTaskMenu = (event: Event) => {
  menu.value.toggle(event);
};

function onConfirmCreateTask(value: string) {
  createTask(value);
  taskCreateDialogOpen.value = false;
}

function onConfirmAddTask(value: Task) {
  addTask(value);
  taskAddDialogOpen.value = false;
}

async function createTask(value: string) {
  await useFetch("/api/tasks/", {
    method: "POST",
    body: JSON.stringify({
      name: value,
      projectId,
      milestone_id: milestoneId,
    }),
  });
}

async function addTask(task: Task) {
  await useFetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify({
      milestone_id: milestoneId,
    }),
  });
}

const taskCreateDialogOpen = ref(false);
const taskAddDialogOpen = ref(false);

</script>

<template>
  <NuxtLayout name="overview">
    <template #header>
      <OverviewHeader :title="milestone!.name" :description="milestone?.description ?? undefined" />
    </template>
    <template #header_action-bar>
      <div class="card relative flex justify-center">
        <div aria-haspopup="true" aria-controls="overlay_menu" @click="toggleAddTaskMenu">
          <IconTaskAdd class="hover:text-primary" />
        </div>
        <Menu id="overlay_menu" ref="menu" :model="AddTaskMenuItems" :popup="true" />
      </div>
      <Icon name="mdi:trash" size="24"
        class="flex-shrink-0 cursor-pointer transition-colors duration-300 hover:text-red-400" @click="confirmDelete" />
      <BaseConfirmDialog />
      <TaskCreateDialog v-if="taskCreateDialogOpen" v-model:open="taskCreateDialogOpen"
        @cancel="() => (taskCreateDialogOpen = false)" @confirm="onConfirmCreateTask" />
      <TaskAddDialog v-if="taskAddDialogOpen" v-model:open="taskAddDialogOpen" :options="tasksWithNoMilestone"
        @cancel="() => (taskAddDialogOpen = false)" @confirm="onConfirmAddTask" />
    </template>
  </NuxtLayout>
</template>
