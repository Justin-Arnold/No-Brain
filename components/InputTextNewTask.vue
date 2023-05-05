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
        <span class="absolute top-0 right-3 h-full flex items-center">
            <Icon
                name="icon-park-outline:add-two"
                size="1.6rem"
                class="hover:text-purple-200 transition-all duration-300 cursor-pointer"
                @click="$emit('icon-clicked')"
            />
        </span>
    </span>
</template>
