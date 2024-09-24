<template>
    <div class="auth-page">
        <div class="form-container">
            <h1 class="title">صارح</h1>
            <form @submit.prevent="handleLogin()">
                <div class="input-container">
                    <input type="email" v-model="formData.email" placeholder="البريد الإلكتروني" required autocomplete="on" maxlength="255">
                </div>
                <div class="input-container">
                    <input type="password" v-model="formData.password" placeholder="كلمة المرور" required autocomplete="off" maxlength="255">
                </div>
                <div class="input-container submit">
                    <input type="submit" value="الدخول">
                </div>
            </form>
            <NuxtLink to="/register">تسجيل حساب جديد</NuxtLink>
        </div>
    </div>
</template>

<script setup>

    import { useAuthStore } from '~/stores/useAuthStore';

    definePageMeta({
        middleware: "guest",
    });

    const auth = useAuthStore();
    const formData = ref({
        email: '',
        password: '',
    });
    const errors = ref({})

    async function handleLogin() {

        await auth.login(formData.value);

    }

</script>
