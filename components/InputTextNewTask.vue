<script setup lang="ts">
const STRINGS = {
    PLACEHOLDER: "New Task",
};

defineOptions({ inheritAttrs: false });

// ====================
// Component API
// ====================
defineEmits<{
    "icon-clicked": [void];
}>();
</script>

<template>
    <span class="relative">
        <InputTextBase :placeholder="STRINGS.PLACEHOLDER" v-bind="$attrs" />
        <span class="absolute right-3 top-0 flex h-full items-center">
            <Icon
                name="icon-park-outline:add-two"
                size="1.6rem"
                class="cursor-pointer transition-all duration-300 hover:text-purple-200"
                @click="$emit('icon-clicked')"
            />
        </span>
    </span>
</template>
