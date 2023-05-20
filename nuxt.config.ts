// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        'nuxt-windicss',
        '@nuxtjs/supabase',
        'nuxt-icon'
    ],
    css: [
        "primevue/resources/themes/lara-light-blue/theme.css",
        "primevue/resources/primevue.css",
    ],
    build: {
        transpile: ["primevue"]
    }
})
