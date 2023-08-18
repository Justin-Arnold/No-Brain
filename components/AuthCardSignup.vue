<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z, object, string } from "zod";

const client = useSupabaseAuthClient();
const user = useSupabaseUser();

const isLoginPending = ref(false);


// -------------------------
// Schema
// -------------------------

const signUpFormSchema = object({
    email: string()
        .min(1, "Email is required")
        .email("Email is invalid")
        .default(""),
    password: string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .default(""),
    confirmPassword: string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .default(""),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
})

type SignUpForm = z.infer<typeof signUpFormSchema>;

// -------------------------
// Form
// -------------------------
const {
    values,
    errors,
    handleSubmit,
    defineInputBinds,
    resetForm,
    setFieldError,
} = useForm<SignUpForm>({
    validationSchema: toTypedSchema(signUpFormSchema),
});

const email = defineInputBinds("email");
const password = defineInputBinds("password");
const confirmPassword = defineInputBinds("confirmPassword");

const onSubmit = handleSubmit(async (values) => {
    isLoginPending.value = true;
    const { error } = await client.auth.signUp({
        email: values.email,
        password: values.password,
    })
    isLoginPending.value = false;
    if (error) {
        setFieldError("email", error.message);
        setFieldError("password", error.message);
    } else {
        navigateTo("/auth");
    }
});
</script>

<template>
    <BaseCard class="w-[400px]">
        <template #title>
            <div class="user-select-none flex cursor-pointer items-center gap-4" @click="navigateTo('/')">
                <img src="~/assets/images/logo.png" class="h-12" />
                <h1 class="text-4xl font-bold text-white">Planote</h1>
            </div>
        </template>
        <form class="flex flex-col gap-2 text-white" @submit.prevent>
            <div class="flex flex-col">
                <label> Email </label>
                <BaseInputText
                    v-bind="email"
                    class="rounded p-1"
                />
                <small id="text-error" class="p-error p-0">{{
                    errors.email || "&nbsp;"
                }}</small>
            </div>
            <div class="flex flex-col">
                <label> Password </label>
                <BaseInputText
                    type="password"
                    v-bind="password"
                    class="rounded p-1"
                />
                <small id="text-error" class="p-error">{{
                    errors.password || "&nbsp;"
                }}</small>
            </div>
            <div class="flex flex-col">
                <label>Confirm Password </label>
                <BaseInputText
                    type="password"
                    v-bind="confirmPassword"
                    class="rounded p-1"
                />
                <small id="text-error" class="p-error">{{
                    errors.confirmPassword
                }}</small>
            </div>
        </form>
        <template #footer>
            <BaseButton
                @click="onSubmit"
                class="w-full"
                :label="'Sign Up'"
                :loading="isLoginPending"
            />
            <p class="mt-2 text-center text-xs font-light text-slate-300">
                Already have an account? Click
                <!-- <span class="text-purple-400" @click="switchMode">here</span> to -->
                <span class="text-purple-400" @click="$emit('change-mode')">here</span> to
                log in.
            </p>
        </template>
    </BaseCard>
</template>
