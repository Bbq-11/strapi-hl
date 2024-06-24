<script setup>
import { onBeforeMount, ref } from 'vue';
import { useTheme } from 'vuetify';
import { useProductStore } from './stores/Products.js';
import Guide from './pages/Guide.vue';
import Home from './pages/Home.vue';
import { mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';

const productStore = useProductStore();

const theme = useTheme();
const actualTheme = ref('');
actualTheme.value = localStorage.getItem('theme') || 'light';

function toggleTheme() {
    actualTheme.value = actualTheme.value === 'light' ? 'dark' : 'light';
    theme.global.name.value = actualTheme.value;
    localStorage.theme = actualTheme.value;
}

onBeforeMount(() => productStore.addProducts());
</script>

<template>
    <v-app>
        <v-layout class="user-select-hidden">
            <v-app-bar>
                <router-link to="/">
                    <v-btn
                        class="py-4"
                        elevation="10"
                        text="Главная страница"
                    />
                </router-link>
                <router-link to="/guide">
                    <v-btn
                        class="py-4"
                        elevation="10"
                        text="Справочник"
                    />
                </router-link>
                <router-link to="/charts">
                    <v-btn
                        class="py-4"
                        elevation="10"
                        text="Статистика"
                    />
                </router-link>
                <v-spacer />
                <v-btn
                    class="h-auto w-auto rounded-xl pa-3"
                    @click="toggleTheme"
                >
                    <v-icon
                        v-if="actualTheme === 'dark'"
                        size="40"
                        :icon="mdiWeatherSunsetUp"
                    />
                    <v-icon
                        v-else
                        size="40"
                        :icon="mdiWeatherSunsetDown"
                    />
                </v-btn>
            </v-app-bar>
            <v-main>
                <v-container class="">
                    <router-view />
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
</template>
