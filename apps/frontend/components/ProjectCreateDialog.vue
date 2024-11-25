<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z, object, string } from "zod";

// -------------------------
// Component Input / Output
// -------------------------
const isOpen = defineModel<boolean>()

const user = useSupabaseUser();
const userID = computed(() => user.value?.id);

const emit = defineEmits<{
    save: []
}>();

// -------------------------
// Schema
// -------------------------
const createProjectSchema = object({
    name: string()
        .min(1, "Project name is required")
        .default(""),
    description: string()
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

const {
    handleSubmit,
    defineInputBinds,
    setFieldError,
} = useForm<CreateProjectForm>({
    validationSchema: toTypedSchema(createProjectSchema),
});

const name = defineInputBinds("name");
const description = defineInputBinds("description");


const onSubmit = handleSubmit(async () => {
    const resp = await useFetch(`/api/projects`, {
        method: "POST",
        body: JSON.stringify({
            name: name.value.value,
            description: description.value.value,
            userId: userID.value
        }),
    });

    emit('save')
});
</script>

<template>
    <BaseDialog v-model="isOpen" title="Create Project">
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