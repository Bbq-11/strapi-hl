<script setup>
import { mdiMenu, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { useDisplay, useTheme } from 'vuetify';
import { ref, watch } from 'vue';

const theme = useTheme();
const { mobile } = useDisplay();
const actualTheme = ref('');
const isMobile = ref(mobile.value);
actualTheme.value = localStorage.getItem('theme') || 'light';

function toggleTheme() {
    actualTheme.value = actualTheme.value === 'light' ? 'dark' : 'light';
    theme.global.name.value = actualTheme.value;
    localStorage.theme = actualTheme.value;
}

watch(
    () => mobile.value,
    () => (isMobile.value = mobile.value),
);
</script>

<template>
    <v-app-bar :density="isMobile ? 'compact' : 'default'">
        <v-row no-gutters>
            <v-col cols="auto">
                <v-menu v-if="isMobile">
                    <template #activator="{ props }">
                        <v-btn
                            class="text-primary"
                            v-bind="props"
                            :icon="mdiMenu"
                        />
                    </template>
                    <v-list class="rounded-lg">
                        <VItemGroup class="d-flex flex-column px-4">
                            <v-btn
                                class="text-primary text-caption px-2"
                                to="/"
                                variant="flat"
                                text="Главная"
                            />
                            <v-btn
                                class="text-primary text-caption px-2"
                                to="/guide"
                                variant="flat"
                                text="Справочник"
                            />
                            <v-btn
                                class="text-primary text-caption px-2"
                                to="/charts"
                                variant="flat"
                                text="Статистика"
                            />
                        </VItemGroup>
                    </v-list>
                </v-menu>
                <v-row
                    v-else
                    no-gutters
                >
                    <v-col>
                        <v-btn
                            class="text-primary text-subtitle-1 px-4 px-md-8"
                            to="/"
                            variant="flat"
                            text="Главная"
                        />
                    </v-col>
                    <v-col>
                        <v-divider
                            vertical
                            inset
                            color="primary"
                            class="mx-1"
                            opacity="100"
                        />
                    </v-col>
                    <v-col>
                        <v-btn
                            class="text-primary text-subtitle-1 px-4 px-md-8"
                            to="/guide"
                            variant="flat"
                            text="Справочник"
                        />
                    </v-col>
                    <v-col>
                        <v-divider
                            class="mx-1"
                            vertical
                            inset
                            color="primary"
                            opacity="100"
                        />
                    </v-col>
                    <v-col>
                        <v-btn
                            class="text-primary text-subtitle-1 px-4 px-md-8"
                            to="/charts"
                            variant="flat"
                            text="Статистика"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-col
            class="d-flex justify-end pa-0"
            cols="auto"
        >
            <v-btn
                color="primary"
                :class="isMobile ? 'rounded-xl' : 'rounded-lg'"
                @click="toggleTheme"
            >
                <v-icon
                    :size="isMobile ? 25 : 35"
                    :icon="actualTheme === 'dark' ? mdiWeatherSunsetUp : mdiWeatherSunsetDown"
                />
            </v-btn>
        </v-col>
    </v-app-bar>
</template>
