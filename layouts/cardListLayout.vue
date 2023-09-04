<script setup lang="ts">
import ScrollPanel from 'primevue/scrollpanel';



</script>

<template>
    <div class="h-full overflow-hidden flex flex-col relative">
        <div class="flex-grow overflow-hidden">
            <ScrollPanel class="h-full w-full">
                <div class="grid grid-cols-auto-fill-400 sm:grid-cols-auto-fill-200 lg:grid-cols-auto-fill-300 gap-4">
                    <slot></slot>
                </div>
            </ScrollPanel>
        </div>
        <div class="flex justify-center items-center">
            <slot name="bottomButton"></slot>
        </div>
    </div>
</template>
