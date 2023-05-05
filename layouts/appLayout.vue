<template>
    <div class="h-screen w-screen fixed top-0 left-0 flex">
        <AppSidebar></AppSidebar>
        <div class="grow overflow-hidden p-8 w-full">
            <slot />
        </div>
    </div>
</template>
