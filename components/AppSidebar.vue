<script setup lang="ts">

const topLevelRoutes = [
    {
        name: "Home",
        path: "/",
    }, {
        name: "Projects",
        path: "/projects",
    }, {
        name: "Areas",
        path: "/areas",
    }
] as const

const client = useSupabaseAuthClient();

async function signOut() {
    await client.auth.signOut();
    navigateTo("/auth");
}

</script>

<template>
    <div class="flex w-60 flex-shrink-0 flex-col items-center gap-4 bg-black/50 p-4 text-white">
        <div class="user-select-none flex cursor-pointer items-center gap-4" @click="navigateTo('/')">
            <img src="~/assets/images/logo.png" class="h-12" />
            <h1 class="text-4xl font-bold">
                Planote
            </h1>
        </div>
        <nav class="w-full flex-grow overflow-y-auto scrollbar-hide">
            <ul class="flex flex-col gap-4">
                <li v-for="route, index in topLevelRoutes" :key="index">
                    <NuxtLink

                        :to="route.path"
                        class="w-full rounded bg-white/5 p-2 text-center inline-block hover:bg-purple-200/50"
                        active-class="text-purple-300"
                    >
                        {{ route.name }}
                    </NuxtLink>
                </li>
            </ul>
        </nav>
        <BaseButton label="Logout" @click="signOut" />
    </div>
</template>


<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>