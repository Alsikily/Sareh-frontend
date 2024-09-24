import { defineStore } from 'pinia'
import { useApiFetch } from '~/composables/useApiFetch';
import { useAuthStore } from '~/stores/useAuthStore';

export const useProfileStore = defineStore('profile', () => {

    const auth = useAuthStore();

    async function getMyProfile() {

        const response = await useApiFetch("user/profile", {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        if (response.value.status == 'success') {

            auth.user.un_read_messages_count = response.value.user.un_read_messages_count;

        }

        return response;

    }

    async function updatePhoto(file) {

        const FD = new FormData();
        FD.append('photo', file);

        const response = await useApiFetch("user/profile", {
            method: "POST",
            body: FD,
            headers: {
                Authorization: `Bearer ${auth.token}`,
                ContentType: 'multipart/form-data',
            }
        });

        if (response.value.status == "success") {

            auth.user.photo = response.value.user.photo;

        }

        return response;

    }
    
    async function updateSwitchers(publish_Status, unknown_Status) {

        const response = await useApiFetch("user/profile", {
            method: "PATCH",
            body: {
                'publish_on_public': publish_Status,
                'publish_unknown': unknown_Status,
            },
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        if (response.value.status == "success") {

            auth.user.publish_on_public = response.value.user.publish_on_public;
            auth.user.publish_unknown = response.value.user.publish_unknown;

        }

        return response;

    }

    return { getMyProfile, updatePhoto, updateSwitchers };

})