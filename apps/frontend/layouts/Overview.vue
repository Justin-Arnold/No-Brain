<template>
    <div class="h-full overflow-hidden">
        <div class="flex h-full justify-between gap-4">
            <div class="flex w-full flex-col items-center justify-between">
                <div class="flex w-full items-center justify-between">
                    <div class="flex flex-col items-start gap-2">
                        <slot name="header" />
                    </div>
                    <div class="flex gap-2">
                        <slot name="header_action-bar" />
                    </div>
                </div>
            </div>
            <div
                v-if="$slots.panel"
                class="flex h-full w-[500px] flex-col rounded-md bg-surface-800 p-4"
            >
                <slot name="panel" />
            </div>
        </div>
    </div>
</template>
