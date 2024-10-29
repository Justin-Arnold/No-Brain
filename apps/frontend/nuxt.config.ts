// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/supabase",
        "nuxt-icon",
        "@vee-validate/nuxt",
        "@nuxtjs/tailwindcss",
    ],
    css: [
        "primevue/resources/primevue.css",
        "primevue/resources/themes/soho-dark/theme.css",
    ],
    build: {
        transpile: ["primevue"],
    },
    vite: {
        vue: {
            script: {
                defineModel: true,
                propsDestructure: true,
            },
        },
    },
    app: {
        layoutTransition: { name: 'layout', mode: 'out-in' }
    },
});
