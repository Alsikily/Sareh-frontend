<template>
    <div class="auth-page">
        <div class="form-container">
            <h1 class="title">صارح</h1>
            <form @submit.prevent="handleRegister()">
                <div class="input-container">
                    <input type="username" v-model="formData.username" placeholder="اسم المستخدم" required>
                </div>
                <div class="input-container">
                    <input type="email" v-model="formData.email" placeholder="البريد الإلكتروني" required>
                </div>
                <div class="input-container">
                    <input type="password" v-model="formData.password" placeholder="كلمة المرور" required autocomplete="off">
                </div>
                <div class="input-container submit">
                    <input type="submit" value="التسجيل">
                </div>
            </form>
            <NuxtLink to="/login">هل لديك حساب بالفعل ؟</NuxtLink>
        </div>
    </div>
</template>

<script setup>

import { useAuthStore } from '~/stores/useAuthStore';

definePageMeta({
    middleware: "guest"
});

const auth = useAuthStore();
const formData = ref({
    username: null,
    email: null,
    password: null,
})

async function handleRegister() {

    await auth.register(formData.value);

}

</script>
