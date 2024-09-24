import { UseFetchOptions } from "nuxt/app";
import { useResponseMessagesStore } from '~/stores/useResponseMessagesStore';

export async function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {

    const messages = useResponseMessagesStore();

    const { data: response} = await useFetch(`http://127.0.0.1:8000/api/${path}`, {

        watch: false,
        ...options,
        headers: {
            ...options?.headers
        }

    });

    function setSuccess(response) {

        messages.status = response.value.status;
        messages.message = response.value.message;
        messages.messages_length = 1;
        messages.removeAllMessages();

    }

    function setErrors(response) {

        messages.status = response.value.status;
        messages.messages = response.value.errors;
        messages.messages_length = Object.keys(response.value.errors).length;
        messages.removeAllMessages();

    }

    if (response.value.message != undefined || response.value.errors != undefined) {

        if (response.value.status == "success") {
    
            setSuccess(response);
    
        } else {
    
            setErrors(response);
    
        }

    }

    return response;

}