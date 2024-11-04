export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser();

    if (user.value) {
        return;
    }

    return navigateTo("/auth");
});
