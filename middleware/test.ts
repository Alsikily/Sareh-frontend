import { useAuthStore } from "~/stores/useAuthStore"

export default defineNuxtRouteMiddleware((to, from) => {

    console.log(from);

})