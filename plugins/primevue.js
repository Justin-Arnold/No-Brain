import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Skeleton from "primevue/skeleton";

import ConfirmationService from "primevue/confirmationservice";
import ConfirmPopup from "primevue/confirmpopup";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.component("Skeleton", Skeleton);
    nuxtApp.vueApp.component("ConfirmPopup", ConfirmPopup);

    nuxtApp.vueApp.use(ConfirmationService);
});
