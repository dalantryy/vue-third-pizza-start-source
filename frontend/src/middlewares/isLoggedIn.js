import { useAuthStore } from "@/store/auth";

export const isLoggedIn = async ({ to }) => {
    const authStore = useAuthStore();
    await authStore.whoami();

    if (!authStore.isAuthenticated) {
        /* Сохраняем маршрут, по которому пользователь намеревался перейти,
         * чтобы перенаправить на него пользователя после успешной авторизации
         */
        return { path: "/login", query: { redirect: to.fullPath } };
    } else {
        return true;
    }
};