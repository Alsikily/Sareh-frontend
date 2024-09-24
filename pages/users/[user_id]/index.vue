<template>
    <div>
        <NuxtLayout name="dashboard">
            <div class="cover-container">
                <div class="info" v-if="userProfile != null && !sent_message">
                    <NuxtLink :to='`${user_id}/profile`' class="img">
                        <img v-if="userProfile.photo != null" :src="userProfile.photo" :alt="userProfile.username">
                        <img v-else src='~/assets/images/1.svg' :alt="userProfile.username">
                    </NuxtLink>
                    <h2 class="name">{{ userProfile.username }}</h2>
                    <form class="switches" @submit.prevent="sendMessage()">
                        <div class="input-container textarea">
                            <textarea v-model="message" maxlength="5000" required></textarea>
                            <span :class="['length', message?.length >= 5000 ? 'maxLength' : '']">{{ message ? message?.length : 0 }} / 5000</span>
                        </div>
                        <div class="switcher">
                            <span class="title">النشر على العام</span>
                            <label class="toggle">
                                <input class="toggle__checkbox" type="checkbox" :disabled='!userProfile.publish_on_public' v-model="publishStatus">
                                <span :class="['toggle__switch', !userProfile.publish_on_public ? 'disabled' : '']"></span>
                            </label>
                        </div>
                        <div class="switcher">
                            <span class="title">النشر مجهول الهوية</span>
                            <label class="toggle">
                                <input class="toggle__checkbox" type="checkbox" :disabled="!userProfile.publish_unknown" v-model="publishUnknown">
                                <span :class="['toggle__switch', !userProfile.publish_unknown ? 'disabled' : '']"></span>
                            </label>
                        </div>
                        <div class='input-container sending'>
                            <input type="submit" :value="!sending ? 'إرسال' : ''" :disabled="sending">
                            <span class="sending" v-if="sending"></span>
                        </div>
                    </form>
                </div>
                <div class="info" v-if="sent_message">
                    <p class="send-message">تم ارسال الصراحة بنجاح</p>
                    <button class="another-message" @click="anthorMessage()">رسالة اخري</button>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>

// Imports
import { useAuthStore } from '~/stores/useAuthStore';
import { userMessageStore } from '~/stores/userMessageStore';

// Data
const { isLogin, user } = useAuthStore();
const userStore = userMessageStore();
const { user_id } = useRoute().params;
const userProfile = ref(null);
const message = ref(null);
const publishStatus = ref(false);
const publishUnknown = ref(true);
const sending = ref(false);
const sent_message = ref(false);

// Get User Profile Data
const userProfileResponse = await userStore.getUserProfile(user_id);
if (userProfileResponse.value.status == 'success') {

    if (userProfileResponse.value.user_profile.publish_unknown == 0 && !isLogin) {

        navigateTo({
            path: '/login',
            query: {
                from: useRoute().fullPath
            }
        });

    } else {

        userProfile.value = userProfileResponse.value.user_profile;
    
        if (!userProfileResponse.value.user_profile.publish_unknown) {
    
            publishUnknown.value = Boolean(userProfileResponse.value.user_profile.publish_unknown);
    
        }

    }

}

// Send Message
async function sendMessage() {

    sending.value = true;
    const response = await userStore.storeMessage({
        body: message.value,
        user_id: user_id,
        sender_id: user?.id,
        status: String(+publishStatus.value)
    });

    if (response.value.status == 'success') {

        message.value = null;
        sending.value = false;
        sent_message.value = true;

    }

}

// Another Message
function anthorMessage() {

    sent_message.value = false;

}

useHead({
    'title': 'Send message'
});

</script>

<style lang="scss" scoped>
    .cover-container {
        justify-content: center;
        > .info {
            &:has(> .send-message) {
                gap: 10px;
            }
            > p.send-message {
                color: #fff;
                font-size: 24px;
            }
            > button.another-message {
                background-color: #FFF;
                color: #52CDA5;
                font-weight: bold;
                border: 0;
                outline: 0;
                padding: 10px 40px;
                border-radius: 4px;
                font-size: 16px;
                cursor: pointer;
            }
        }
    }
    form {
        > .input-container {
            position: relative;
            overflow: hidden;
            &.sending {
                display: flex;
                justify-content: center;
                align-items: center;
                > .sending {
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    border: 5px solid #52CDA5;
                    border-left-color: transparent;
                    border-radius: 50%;
                    animation: rotate_sending 1s linear infinite forwards;
                    transform-origin: 50% 50%;
                    transform-style: preserve-3d;
                }
            }
            &.textarea {
                height: 225px;
            }
            > textarea {
                height: 100%;
                background-color: rgba(225, 225, 225, 20%);
                padding: 5px 12px;
                color: #fff;
                font-size: 16px;
                border-radius: 4px;
                overflow: hidden;
            }
            > span.length {
                position: absolute;
                left: 10px;
                bottom: 2px;
                font-size: 14px;
                color: #fff;
                direction: ltr;
                &.maxLength {
                    color: #000;
                    font-weight: bold;
                }
            }
            > input[type='submit'] {
                background-color: rgb(255, 255, 255);
                color: #52CDA5;
                font-weight: bold;
                padding: 10px 0;
                border-radius: 4px;
            }
        }
    }

    @keyframes rotate_sending {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>