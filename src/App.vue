<script setup>
import { onBeforeMount, ref } from 'vue';
import { useTheme } from 'vuetify';
import { useProductStore } from './stores/Products.js';
import Guide from './pages/Guide.vue';
import Home from './pages/Home.vue';
import { mdiHome, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';

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
                <router-link
                    class="h-100"
                    to="/"
                >
                    <v-btn
                        class="text-primary text-subtitle-1 h-100 px-8"
                        variant="flat"
                        text="Главная"
                    />
                </router-link>
                <v-divider
                    class="mx-1"
                    vertical
                    inset
                    color="primary"
                    opacity="100"
                />
                <router-link
                    class="h-100"
                    to="/guide"
                >
                    <v-btn
                        class="text-primary text-subtitle-1 h-100 px-8"
                        variant="flat"
                        text="Справочник"
                    />
                </router-link>
                <v-divider
                    class="mx-1"
                    vertical
                    inset
                    color="primary"
                    opacity="100"
                />
                <router-link
                    class="h-100"
                    to="/charts"
                >
                    <v-btn
                        class="text-primary text-subtitle-1 h-100 px-8"
                        variant="flat"
                        text="Статистика"
                    />
                </router-link>
                <v-spacer />
                <v-btn
                    class="h-100 pa-3"
                    color="primary"
                    @click="toggleTheme"
                >
                    <v-icon
                        v-if="actualTheme === 'dark'"
                        size="35"
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
                <v-container class="mt-14">
                    <router-view />
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
</template>
