<template>
    <div class="h-full overflow-hidden">
        <div class="flex justify-between gap-4 h-full">
            <div class="flex flex-col items-center justify-between w-full">
                <div class="w-full flex items-center justify-between">
                    <div class="flex flex-col items-start gap-2">
                        <slot name="header" />
                    </div>
                    <div>
                        <slot name="header_action-bar" />
                    </div>
                </div>
            </div>
            <div v-if="$slots.panel" class="bg-surface-800 h-full w-[500px] p-4 rounded-md flex flex-col">
                <slot name="panel" />
            </div>
        </div>
    </div>
</template>