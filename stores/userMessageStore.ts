import { defineStore } from 'pinia'
import { useApiFetch } from '~/composables/useApiFetch';

type formData = {
    body: string,
    user_id: number,
    sender_id: any,
    status: number
};

export const userMessageStore = defineStore('user', () => {

    async function getUserProfile(user_id: number) {

        const response = await useApiFetch(`user/${user_id}/send-message`);
        return response;

    }

    async function storeMessage(formData: formData) {

        const response = await useApiFetch('user/messages', {
            method: "POST",
            body: formData,
        });
        return response;

    }

    return { getUserProfile, storeMessage };

})