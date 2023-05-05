// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // postcss: {
    //     plugins: {
    //         tailwindcss: {},
    //         autoprefixer: {},
    //     },
    // },
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
});
