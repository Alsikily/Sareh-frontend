import { defineStore } from 'pinia'
import { useApiFetch } from '~/composables/useApiFetch';
import { useAuthStore } from '~/stores/useAuthStore';

export const useMessageStore = defineStore('message', () => {

    const auth = useAuthStore();

    async function allMessages() {

        const response = await useApiFetch("user/all-messages", {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        if (response.value.status == 'success') {

            auth.user.un_read_messages_count = 0;

        }

        return response;

    }

    async function publicMessages(user_id: number) {

        const response = await useApiFetch(`user/${user_id}/public-messages`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        return response;

    }

    async function favMessages() {

        const response = await useApiFetch("user/fav-messages", {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        return response;

    }

    async function updateFav(message_id: number) {

        const response = await useApiFetch(`user/messages/${message_id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        return response;

    }

    async function deleteMessage(message_id: number) {

        const response = await useApiFetch(`user/messages/${message_id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        return response;

    }
    
    return { allMessages, favMessages, updateFav, publicMessages, deleteMessage };

})