import { defineStore } from 'pinia'

export const useResponseMessagesStore = defineStore('messages', () => {

    const status = ref<string | null>(null);
    const messages = ref<object | null>(null);
    const messages_length = ref(0);
    const message = ref<string | null>(null);

    function removeAllMessages() {

        setTimeout(() => {
            status.value = null;
            messages.value = null;
            messages_length.value = 0;
            message.value = null;
        }, 5000);

    }

    return { status, messages, messages_length, message, removeAllMessages };

})