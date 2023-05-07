<script setup lang="ts">

const client = useSupabaseAuthClient()
const username = ref('')
const password = ref('')
const login = async () => {
    const {data, error} = await client.auth.signInWithPassword({
        email: username.value,
        password: password.value
    })
    if (error) {
        console.log(error)
    } else {
        navigateTo('/')
    }
}

const signup = async () => {
    const {data, error} = await client.auth.signUp({
        email: username.value,
        password: password.value
    })
    if (error) {
        console.log(error)
    } else {
        navigateTo('/login')
    }
}


</script>

<template>
    <div class="h-screen w-screen grid place-items-center">
        <div class="bg-black/50 w-[400px] rounded-lg p-2">
            <div class="flex gap-4 items-center cursor-pointer user-select-none mb-4 px-2" @click="navigateTo('/')">
                <img src="~/assets/images/logo.png"  class="h-12"/>
                <h1 class="text-4xl font-bold text-white">
                    Planet
                </h1>
            </div>
            <div class="flex flex-col p-4 text-white">
                <label class="text-xs">Email</label>
                <input type="text" v-model="username" placeholder="Username" class="mb-4 p-1 rounded text-black"/>
                <label class="text-xs">Password</label>
                <input type="password" v-model="password" placeholder="Password" class="mb-8 p-1 rounded text-black"/>
                <div class="flex gap-2">
                    <button @click="signup" class="border-2 border-purple-500 rounded p-1 w-full">Sign up</button>
                    <button @click="login" class="bg-gradient-to-r from-purple-800 to-fuchsia-700 rounded p-1 w-full">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>