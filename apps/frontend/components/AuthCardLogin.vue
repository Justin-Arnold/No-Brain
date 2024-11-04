<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z, object, string } from "zod";

const client = useSupabaseAuthClient();
const user = useSupabaseUser();

const isLoginPending = ref(false);
const cardMode = ref<"login" | "sign-up">("login");


// -------------------------
// Schema
// -------------------------
const loginFormSchema = object({
    email: string()
        .min(1, "Email is required")
        .email("Email is invalid")
        .default(""),
    password: string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .default(""),
});

type LoginForm = z.infer<typeof loginFormSchema>;


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
} = useForm<LoginForm>({
    validationSchema: toTypedSchema(loginFormSchema),
});

const email = defineInputBinds("email");
const password = defineInputBinds("password");

const onSubmit = handleSubmit(async (values) => {
    isLoginPending.value = true;
    const { error } = await client.auth.signInWithPassword({
        email: values.email,
        password: values.password,
    });
    isLoginPending.value = false;
    if (error) {
        setFieldError("email", error.message);
        setFieldError("password", error.message);
    } else {
        navigateTo("/");
    }
});
</script>

<template>
    <BaseCard class="w-[400px] flex flex-col">
        <template #title>
            <div class="user-select-none flex cursor-pointer items-center gap-4" @click="navigateTo('/')">
                <img src="~/assets/images/logo.png" class="h-12" />
                <h1 class="text-4xl font-bold text-white">Planote</h1>
            </div>
        </template>
        <form class="flex flex-col gap-8 text-white my-8" @submit.prevent>
            <div class="flex flex-col">
                <BaseInputText name="plcGroupName" label="Email" v-bind="email" :errors="errors.email" />
            </div>
            <div class="flex flex-col">
                <BaseInputText name="plcGroupPassword" label="Password" type="password" v-bind="password"
                    :errors="errors.password" />
                <!-- <div class="flex items-center gap-2 text-slate-300 text-xs -mb-4 mt-2"><input type="checkbox" name="remember" value="true" />Remember Me</div> -->
            </div>
        </form>
        <template #footer>
            <BaseButton @click="onSubmit" class="w-full" :label="cardMode === 'login' ? 'Login' : 'Sign Up'"
                :loading="isLoginPending" />
            <p class="mt-2 text-center text-xs font-light text-slate-300">
                Don't have an account? Click
                <!-- <span class="text-purple-400" @click="switchMode">here</span> to -->
                <span class="text-purple-400" @click="$emit('change-mode')">here</span> to
                sign up.
            </p>
        </template>
    </BaseCard>
</template>
