<template>
    <div class="fixed left-0 top-0 flex h-screen w-screen">
        <AppSidebar></AppSidebar>
        <div class="w-full grow overflow-hidden p-8">
            <slot />
        </div>
    </div>
</template>
