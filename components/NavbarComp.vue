<template>
    <div>
        <nav>
            <div class="first">
                <h1 class="title">صارح</h1>
                <ul class="navbar">
                    <li v-if="auth.isLogin">
                        <NuxtLink to="/dashboard/profile">
                            <client-only>
                                <font-awesome-icon icon="fa-solid fa-user" />
                            </client-only>
                            حسابى
                        </NuxtLink>
                    </li>
                    <li v-if="auth.isLogin">
                        <NuxtLink to="/dashboard/messages">
                            <client-only>
                                <font-awesome-icon icon="fa-solid fa-comment-alt" />
                            </client-only>
                            صراحات
                            <span class="new">{{ auth.newMessages }}</span>
                        </NuxtLink>
                    </li>
                    <li v-if="auth.isLogin">
                        <NuxtLink to="/dashboard/favourites">
                            <client-only>
                                <font-awesome-icon icon="fa-solid fa-heart" />
                            </client-only>
                            صراحات مفضلة
                        </NuxtLink>
                    </li>
                </ul>
                <button @click="handleLogout()" v-if="auth.isLogin">خروج</button>
                <NuxtLink class="login-link" to="/login" v-else>
                    <client-only>
                        <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
                    </client-only>
                    دخول
                </NuxtLink>
            </div>
            <div class="last">
                <h1 class="title">صارح</h1>
                <div class="icon-bar" @click="openNav = !openNav">
                    <client-only>
                        <font-awesome-icon v-if="!openNav" :icon="['fas', 'bars']" />
                        <font-awesome-icon v-if="openNav" :icon="['fas', 'xmark']" />
                    </client-only>
                </div>
            </div>
        </nav>
        <div class="sub-nav" v-if="openNav">
            <ul>
                <li v-if="auth.isLogin">
                    <NuxtLink to="/dashboard/profile">
                        <client-only>
                            <font-awesome-icon icon="fa-solid fa-user" />
                        </client-only>
                        حسابى
                    </NuxtLink>
                </li>
                <li v-if="auth.isLogin">
                    <NuxtLink to="/dashboard/messages">
                        <client-only>
                            <font-awesome-icon icon="fa-solid fa-comment-alt" />
                        </client-only>
                        صراحات
                        <span class="new">( {{ auth.newMessages }} )</span>
                    </NuxtLink>
                </li>
                <li v-if="auth.isLogin">
                    <NuxtLink to="/dashboard/favourites">
                        <client-only>
                            <font-awesome-icon icon="fa-solid fa-heart" />
                        </client-only>
                        صراحات مفضلة
                    </NuxtLink>
                </li>
                <li v-if="auth.isLogin" class="logout">
                    <NuxtLink @click="handleLogout()">
                        خروج
                    </NuxtLink>
                </li>
                <li v-else class="logout">
                    <NuxtLink @click="handleLogout()">
                        <client-only>
                            <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
                        </client-only>
                        دخول
                    </NuxtLink>
                </li>
                <button></button>
                <!-- <NuxtLink class="login-link" to="/login" v-else>
                    <client-only>
                        <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
                    </client-only>
                    دخول
                </NuxtLink> -->
            </ul>
        </div>
    </div>
</template>

<script setup>

import { useAuthStore } from '~/stores/useAuthStore';

const auth = useAuthStore();
const openNav = ref(false);

async function handleLogout() {

    auth.logout();

}

</script>

<style lang="scss" scoped>

    // Include Helpers
    @use "/scss/helpers/variables" as *;
    @use "/scss/helpers/mixins" as *;
    @use "/scss/helpers/fonts" as *;

    nav {
        height: 60px;
        background-color: $back-main-color;
        width: 100%;
        > div {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            width: 100%;
            > h1.title {
                font-family: 'blaka';
                font-size: 40px
            }
            &.first {
                > ul.navbar {
                    @include flex(row, 30px);
                    align-self: stretch;
                    > li {
                        > a {
                            position: relative;
                            display: flex;
                            align-items: center;
                            height: 100%;
                            color: #FFF;
                            @include flex(row, 6px);
                            > .new {
                                @include circle(25px, $color-danger);
                                @include center;
                            }
                            &.router-link-exact-active:after {
                                content: "";
                                position: absolute;
                                bottom: 0;
                                width: 100%;
                                height: 4px;
                                background-color: $second-color;
                                border-top-left-radius: 6px;
                                border-top-right-radius: 6px;
                            }
                        }
                    }
                }
                > button {
                    background-color: transparent;
                    border: 0;
                    color: #fff;
                    cursor: pointer;
                    height: 100%;
                    outline: none;
                    font-weight: bold;
                    font-size: 16px;
                }
                > .login-link {
                    background-color: #fff;
                    border-radius: 25px;
                    padding: 5px 25px;
                    color: #52CDA5;
                    font-weight: bold;
                    @include flex(row, 6px);
                    align-items: center;
                }
            }
            &.last {
                display: none;
                > .icon-bar {
                    cursor: pointer;
                    > svg {
                        color: #fff;
                    }
                }
            }
        }
    }
    .sub-nav {
        width: 100%;
        height: calc(100vh - 60px);
        background-color: #222222d9;
        position: fixed;
        right: 0;
        top: 60px;
        z-index: 999;
        display: none;
        > ul {
            width: 100%;
            > li {
                width: 100%;
                padding: 10px 10px;
                text-align: center;
                @include center;
                > a {
                    display: block;
                    width: fit-content;
                    color: #fff;
                    @include flex(row, 5px);
                    justify-content: center;
                    align-items: center;
                }
                &.logout {
                    a {
                        background-color: #fff;
                        color: $main-color;
                        padding: 5px 60px;
                        border-radius: 50px;
                    }
                }
            }
        }
    }

    // Responsive
    @media (max-width: 768px) {

        .first {
            display: none;
        }
        .last {
            display: flex !important;
        }
        .sub-nav {
            display: block;
        }

    }

</style>