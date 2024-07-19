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
const mobileSize = ref(mobile.value);
watch(
    () => mobile.value,
    () => {
        mobileSize.value = mobile.value;
    },
);
</script>

<template>
    <v-app-bar density="compact">
        <v-btn
            class="text-primary text-caption text-sm-subtitle-1 h-100 px-0 px-sm-4 px-md-8"
            to="/"
            variant="flat"
            text="Главная"
        />
        <v-divider
            class="mx-1"
            vertical
            inset
            color="primary"
            opacity="100"
        />
        <v-btn
            class="text-primary text-caption text-sm-subtitle-1 h-100 px-0 px-sm-4 px-md-8"
            to="/guide"
            variant="flat"
            text="Справочник"
        />
        <v-divider
            class="mx-1"
            vertical
            inset
            color="primary"
            opacity="100"
        />
        <v-btn
            class="text-primary text-caption text-sm-subtitle-1 h-100 px-0 px-sm-4 px-md-8"
            to="/charts"
            variant="flat"
            text="Статистика"
        />
        <v-spacer />
        <v-btn
            class="h-100"
            color="primary"
            @click="toggleTheme"
        >
            <v-icon
                v-if="actualTheme === 'dark'"
                :size="mobileSize ? 25 : 35"
                :icon="mdiWeatherSunsetUp"
            />
            <v-icon
                v-else
                :size="mobileSize ? 25 : 35"
                :icon="mdiWeatherSunsetDown"
            />
        </v-btn>
    </v-app-bar>
</template>
