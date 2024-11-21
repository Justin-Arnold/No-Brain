<script setup lang="ts" generic="T">
import BaseInputText from "~/components/BaseInputText.vue";
import BaseSelect from "~/components/BaseSelect.vue";

const props = withDefaults(
    defineProps<{
        title: string;
        label: string;
        type?: "text" | "select";
        options?: T[];
        optionLabel?: string;
        confirmLabel?: string;
        cancelLabel?: string;
    }>(),
    {
        type: "text",
        options: undefined,
        optionLabel: undefined,
        confirmLabel: "confirm",
        cancelLabel: "cancel",
    },
);

const emit = defineEmits<{
    cancel: [];
    confirm: [value: string | T[] | undefined];
}>();

const isOpen = defineModel<boolean>("open");

const inputValue = ref<string | T[]>();

const inputComponent = computed(() => {
    switch (props.type) {
        case "text":
            return BaseInputText;
        case "select":
            return BaseSelect;
        default:
            return exhaustiveCheck(props.type);
    }
});
</script>

<template>
    <BaseDialog v-model="isOpen" :title="title">
        <component :is="inputComponent" v-model="inputValue" :label="label" :options="options"
            :option-label="optionLabel" class="w-80" />
        <div class="mt-4 flex items-center justify-end gap-2">
            <BaseButton :label="cancelLabel" outlined @click="emit('cancel')" />
            <BaseButton :label="confirmLabel" @click="emit('confirm', inputValue)" />
        </div>
    </BaseDialog>
</template>
