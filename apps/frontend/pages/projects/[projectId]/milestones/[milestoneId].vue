<script setup lang="ts">
definePageMeta({
  middleware: "authentication",
});

const route = useRoute()

const rootPath = route.fullPath

onMounted(() => {
  const milestoneId = route.params.milestoneId
  navigateTo(`${milestoneId}/overview`)
})

const setNavItems = inject('setNavItems')

onMounted(() => {
  setNavItems([
    {
      label: 'Overview',
      path: `${rootPath}/overview`
    }, {
      label: 'Milestones',
      path: `${rootPath}/milestones`
    }, {
      label: 'Tasks',
      path: `${rootPath}/tasks`
    }
  ])
})

</script>

<template>
  <div class="flex h-full flex-col gap-8 overflow-hidden">
    <RouterView></RouterView>
  </div>
</template>