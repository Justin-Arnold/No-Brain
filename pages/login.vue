<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z, object, string } from "zod";

const client = useSupabaseAuthClient();
const user = useSupabaseUser();

definePageMeta({
    layout: false,
});

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
const { values, errors, handleSubmit, defineInputBinds, resetForm } =
    useForm<LoginForm>({
        validationSchema: toTypedSchema(loginFormSchema),
    });

const email = defineInputBinds("email");
const password = defineInputBinds("password");

const onSubmit = handleSubmit((values) => {
    client.auth.signInWithPassword({
        email: values.email,
        password: values.password,
    });
});

// -------------------------
// Redirect
// -------------------------

watch(user, () => {
    if (user.value) {
        navigateTo("/");
    }
});

function signUp() {
    const { email, password } = values;
    client.auth.signUp({
        email,
        password,
    });
    resetForm();
}
</script>

<template>
    <div class="h-screen w-screen grid place-items-center">
        <div class="bg-black w-[400px] rounded-lg p-4 flex flex-col">
            <div
                class="flex gap-4 items-center cursor-pointer user-select-none pb-4"
                @click="navigateTo('/')"
            >
                <img src="~/assets/images/logo.png" class="h-12" />
                <h1 class="text-4xl font-bold text-white">Planote</h1>
            </div>
            <form class="text-white flex flex-col gap-2" @submit="onSubmit">
                <div class="flex flex-col">
                    <label for="plcGroupName"> Email </label>
                    <input
                        id="plcGroupEmail"
                        v-bind="email"
                        class="p-1 rounded"
                    />
                    <small id="text-error" class="p-error p-0">{{
                        errors.email || "&nbsp;"
                    }}</small>
                </div>
                <div class="flex flex-col">
                    <label for="plcGroupName"> Password </label>
                    <input
                        id="plcGroupPassword"
                        type="password"
                        v-bind="password"
                        class="p-1 rounded"
                    />
                    <small id="text-error" class="p-error">{{
                        errors.password || "&nbsp;"
                    }}</small>
                    <!-- <div class="flex items-center gap-2 text-slate-300 text-xs pb-8"><input type="checkbox" name="remember" value="true" />Remember Me</div> -->
                </div>
                <button
                    type="submit"
                    class="bg-gradient-to-r from-purple-800 to-fuchsia-700 rounded py-1 mt-4 w-full"
                >
                    Login
                </button>
            </form>
            <p class="text-xs font-light text-slate-300 mt-2 text-center">
                Don't have an account? Click
                <span class="text-purple-400" @click="signUp">here</span> to
                sign up.
            </p>
        </div>
    </div>
</template>
