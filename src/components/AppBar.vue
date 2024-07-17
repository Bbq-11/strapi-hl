<script setup>
import { mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { useDisplay, useTheme } from 'vuetify';
import { ref, watch } from 'vue';

const theme = useTheme();
const actualTheme = ref('');
actualTheme.value = localStorage.getItem('theme') || 'light';

function toggleTheme() {
    actualTheme.value = actualTheme.value === 'light' ? 'dark' : 'light';
    theme.global.name.value = actualTheme.value;
    localStorage.theme = actualTheme.value;
}

const { mobile } = useDisplay();
const bb = ref(mobile.value);
watch(
    () => mobile.value,
    () => {
        bb.value = mobile.value;
    },
);
</script>

<template>
    <v-app-bar density="compact">
        <router-link
            class="h-100"
            to="/"
        >
            <v-btn
                class="text-primary text-caption text-sm-subtitle-1 h-100 px-0 px-sm-4 px-md-8"
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
                class="text-primary text-caption text-sm-subtitle-1 h-100 px-0 px-sm-4 px-md-8"
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
                class="text-primary text-caption text-sm-subtitle-1 h-100 px-0 px-sm-4 px-md-8"
                variant="flat"
                text="Статистика"
            />
        </router-link>
        <v-spacer />
        <v-btn
            class="h-100"
            color="primary"
            @click="toggleTheme"
        >
            <v-icon
                v-if="actualTheme === 'dark'"
                :size="bb ? 25 : 35"
                :icon="mdiWeatherSunsetUp"
            />
            <v-icon
                v-else
                :size="bb ? 25 : 35"
                :icon="mdiWeatherSunsetDown"
            />
        </v-btn>
    </v-app-bar>
</template>
