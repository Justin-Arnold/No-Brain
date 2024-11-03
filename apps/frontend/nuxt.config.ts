// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const PlanoteTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{purple.50}',
            100: '{purple.100}',
            200: '{purple.200}',
            300: '{purple.300}',
            400: '{purple.400}',
            500: '{purple.500}',
            600: '{purple.600}',
            700: '{purple.700}',
            800: '{purple.800}',
            900: '{purple.900}',
            950: '{purple.950}'
        }
    }
});

export default defineNuxtConfig({
  modules: [
      "@nuxtjs/supabase",
      "nuxt-icon",
      "@vee-validate/nuxt",
      "@nuxtjs/tailwindcss",
      '@primevue/nuxt-module'
  ],

  primevue: {
      options: {
          theme: {
              preset: PlanoteTheme
          }
      }
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

  compatibilityDate: '2024-10-30'
});