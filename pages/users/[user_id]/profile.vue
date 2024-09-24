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
                                    </span>
                                    <span class="date">
                                        <span>{{ msg.created_at }}</span>
                                    </span>
                                </div>
                            </div>
                            <p class="msg">{{ msg.body }}</p>
                            <div class="icon">
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

    const userMessage = useMessageStore();
    const messages = ref([]);
    const user_id = useRoute().params?.user_id;

    // Get Public Messages
    const response = await userMessage.publicMessages(user_id);
    if (response.value.status == 'success') {
        messages.value = response.value.messages;
    }

    useHead({
        'title': 'Profile'
    });

</script>

<style scoped>
    .cover-container {
        justify-content: flex-start !important;
    }
</style>



