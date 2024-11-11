<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z, object, string } from "zod";

// -------------------------
// Component Input
// -------------------------
const isOpen = defineModel<boolean>()

const props = defineProps<{
    projectId: string
}>();

// -------------------------
// Schema
// -------------------------
const createMilestoneSchema = object({
    name: string()
        .min(1, "Milestone name is required")
        .default(""),
    description: string()
});

type CreateMilestoneForm = z.infer<typeof createMilestoneSchema>;

const {
    handleSubmit,
    defineInputBinds,
} = useForm<CreateMilestoneForm>({
    validationSchema: toTypedSchema(createMilestoneSchema),
});

const name = defineInputBinds("name");
const description = defineInputBinds("description");


const onSubmit = handleSubmit(async () => {
    const resp = await useFetch(`/api/milestones`, {
        method: "POST",
        body: JSON.stringify({
            name: name.value.value,
            description: description.value.value,
            projectId: props.projectId
        }),
    });
});
</script>

<template>
    <BaseDialog v-model="isOpen" title="New Milestone">
        <div class="flex flex-col gap-4 w-80">
            <BaseInputText label="Name" name="name" v-bind="name" />
            <BaseInputText label="Description" name="description" v-bind="description" />
            <div class="flex gap-4">
                <BaseButton label="cancel" block text-only @click="isOpen = false" />
                <BaseButton label="save" block @click="onSubmit" />
            </div>
        </div>
    </BaseDialog>
</template>