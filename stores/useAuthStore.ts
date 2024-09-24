import { defineStore } from 'pinia'
import { useApiFetch } from '~/composables/useApiFetch';
import { useResponseMessagesStore } from '~/stores/useResponseMessagesStore';

type formData = {
    email: string,
    password: string
};

export const useAuthStore = defineStore('auth', () => {

    const user = ref<object | null>(null);
    const isLogin = ref<boolean>(false);
    const token = ref<string | null>(null);
    const newMessages = computed(() => user?.value?.un_read_messages_count);
    const messages = useResponseMessagesStore();

    async function loadUser() {

        const response = await useApiFetch("user", {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        });

        if (response.value.status == "success") {

            user.value.un_read_messages_count = response.value.user.un_read_messages_count;

        }

    }

    function updateInfo(userValue, isLoginValue, tokenValue) {

        user.value = userValue;
        isLogin.value = isLoginValue;
        token.value = tokenValue;

    }

    async function login(formData: formData) {

        const response = await useApiFetch("login", {
            method: "POST",
            body: formData
        });

        if (response.value.status == "success") {

            const { query } = useRoute();
            
            updateInfo(response.value.user, true, response.value.authorisation.token);

            if (query?.from) {

                console.log(query.from);
                navigateTo(query.from, {
                    external: true
                });

            }
            navigateTo("/dashboard/profile");

        }

        return response;

    }

    async function register(formData: formData) {

        const response = await useApiFetch("register", {
            method: "POST",
            body: formData
        });

        if (response.value.status == "success") {

            updateInfo(response.value.user, true, response.value.authorisation.token);
            navigateTo("/dashboard/profile");

        }

        return response;

    }

    async function logout() {

        const response = await useApiFetch("logout", {
            method: "POST",
            body: {
                token: token.value
            }
        });

        if (response.value.status == "success") {

            updateInfo(null, false, null);
            navigateTo("/login");

        }

        return response;

    }

    return { user, token, isLogin, newMessages, loadUser, updateInfo, login, register, logout };

}, {
    persist: true
})