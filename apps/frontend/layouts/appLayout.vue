<script lang="ts" setup>
const store = usePageNavigationStore()
</script>

<template>
    <div class="fixed left-0 top-0 flex h-screen w-screen">
        <AppSidebar></AppSidebar>
        <Toast />
        <div class="w-full grow overflow-hidden p-8 flex flex-col gap-8">
            <BaseBreadCrumbBar :nav-items="store.navItems" :action-items="store.actionItems" />
            <slot />
        </div>
    </div>
</template>
