<template>
    <div>
        <NuxtLayout name="dashboard">
            <div class="cover-container">
                <div class="info">
                    <div class="img">
                        <img v-if="user.photo != null" :src="user.photo" :alt="user.username">
                        <img v-else src='~/assets/images/1.svg' :alt="user.username">
                        <div class="cover">
                            <input type="file" @change="handleUpdatePhoto">
                            <ClientOnly>
                                <font-awesome-icon :icon="['fas', 'user']" />
                            </ClientOnly>
                        </div>
                    </div>
                    <h2 class="name">{{ user.username }}</h2>
                    <div class="options">
                        <ClientOnly>
                            <div class="option">
                                <font-awesome-icon icon="fa-solid fa-comment-alt" />
                                <span>{{ user.messages_count }} صراحة</span>
                            </div>
                        </ClientOnly>
                        <ClientOnly>
                            <div class="option">
                                <font-awesome-icon icon="fa-solid fa-heart" />
                                <span>{{ user.fav_messages_count }} مفضلة</span>
                            </div>
                        </ClientOnly>
                    </div>
                    <div class="url-container">
                        <span class="icon" @click="copyUrl()">
                            <ClientOnly>
                                <font-awesome-icon icon="fa-solid fa-copy" />
                            </ClientOnly>
                        </span>
                        <span class="url" id="messageUrl">http://localhost:3000/users/{{ user.id }}</span>
                    </div>
                    <form class="switches" @change="handleUpdateSwitchers()">
                        <div class="switcher">
                            <span class="title">النشر على العام</span>
                            <label class="toggle">
                                <input class="toggle__checkbox" type="checkbox" v-model="publishStatus">
                                <span class="toggle__switch"></span>
                            </label>
                        </div>
                        <div class="switcher">
                            <span class="title">النشر مجهول الهوية</span>
                            <label class="toggle">
                                <input class="toggle__checkbox" type="checkbox" v-model.parseInt="publishUnknown">
                                <span class="toggle__switch"></span>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>

    // Imports
    import { useProfileStore } from '~/stores/user/useProfileStore';
    import { useResponseMessagesStore } from '~/stores/useResponseMessagesStore';

    // Data
    const user = ref(null);
    const profile = useProfileStore();
    const publishStatus = ref(false);
    const publishUnknown = ref(true);
    const messages = useResponseMessagesStore();

    definePageMeta({
        middleware: "auth"
    });

    const responseMyProfile = await profile.getMyProfile();
    if (responseMyProfile.value.status == 'success') {
        user.value = responseMyProfile.value.user;
        publishStatus.value = Boolean(user.value.publish_on_public);
        publishUnknown.value = Boolean(user.value.publish_unknown);
    }

    // Methods
    function copyUrl() {
        let copyText = document.getElementById("messageUrl");
        navigator.clipboard.writeText(copyText.textContent);
        messages.status = 'success';
        messages.messages_length = 1;
        messages.message = 'تم نسخ رابط الدعوة بنجاح';
        messages.removeAllMessages();
    }

    async function handleUpdatePhoto(e) {

        const file = e.target.files[0];
        user.value.photo = URL.createObjectURL(file);

        await profile.updatePhoto(file);

    }

    async function handleUpdateSwitchers() {

        await profile.updateSwitchers(+publishStatus.value, +publishUnknown.value);

    }

    useHead({
        'title': 'My profile'
    });

</script>

<style scoped>
.cover-container {
    justify-content: center;
}
</style>
