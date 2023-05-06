import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Skeleton from "primevue/skeleton";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.component('Skeleton', Skeleton)
});