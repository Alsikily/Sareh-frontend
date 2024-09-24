<template>
    <div>
        <NuxtLayout name="dashboard">
            <div class="cover-container">
                <div class="info msg">
                    <h3 class="title">الصراحات ( {{ messages.length }} )</h3>
                    <div class="messages">
                        <div class="message" v-for="(msg, index) in messages">
                            <div class="info">
                                <div class="img">
                                    <img src='~/assets/images/1.svg' alt="">
                                </div>
                                <div class="data">
                                    <span class="name">
                                        <span v-if="msg.user == null">شخص مجهول</span>
                                        <span v-else>{{ msg.user.username }}</span>
                                        &nbsp;
                                        <span>{{ msg.status == 'private' ? '( خاص )' : '( عام )' }}</span>
                                    </span>
                                    <span class="date">
                                        <span>{{ msg.created_at }}</span>
                                        <ClientOnly>
                                            <span @click="handleFav(msg.id, index)">
                                                <font-awesome-icon v-if="msg.fav == 0" :icon="['far', 'heart']" />
                                                <font-awesome-icon v-else :icon="['fa', 'heart']" />
                                            </span>
                                        </ClientOnly>
                                    </span>
                                </div>
                            </div>
                            <p class="msg">{{ msg.body }}</p>
                            <div class="icons">
                                <span class="delete" @click="deleteMessage(msg.id, index)">
                                    <ClientOnly>
                                        <font-awesome-icon :icon="['fas', 'trash']" />
                                    </ClientOnly>
                                    حذف
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>

    // Imports
    import { useMessageStore } from '~/stores/user/useMessageStore';

    const message = useMessageStore();
    const messages = ref([]);

    definePageMeta({
        middleware: "auth"
    });

    // Get All Messages
    const response = await message.allMessages();
    if (response.value.status == 'success') {
        messages.value = response.value.messages;
    }

    // Update Fav
    async function handleFav(msg_id, index) {

        const new_value = messages.value[index].fav == 0 ? 1 : 0;
        messages.value[index].fav = new_value;

        const response = await message.updateFav(msg_id);

        if (response.value.status == 'success') {

            messages.value[index].fav = response.value.message_updated.fav;

        }

    }

    // Delete Message
    async function deleteMessage(msg_id, index) {

        const response = await message.deleteMessage(msg_id);
        if (response.value.status == 'success') {
            messages.value.splice(index, 1);
        }

    }

    useHead({
        'title': 'Messages'
    });

</script>

<style scoped>
    .cover-container {
        justify-content: flex-start !important;
    }
</style>

<style lang="scss">

    // Include Helpers
    @use "scss/helpers/variables" as *;
    @use "scss/helpers/mixins" as *;
    @use "scss/helpers/fonts" as *;



</style>
