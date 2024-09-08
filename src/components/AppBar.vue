<script setup>
import { mdiMenu, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { useDisplay, useTheme } from 'vuetify';
import { ref } from 'vue';
import AlertResponse from './AlertResponse.vue';

import { useProductStore } from '../stores/Products.js';

const productStore = useProductStore();

const theme = useTheme();
const { mobile } = useDisplay();
const actualTheme = ref('');
actualTheme.value = localStorage.getItem('theme') || 'light';

function toggleTheme() {
    actualTheme.value = actualTheme.value === 'light' ? 'dark' : 'light';
    theme.global.name.value = actualTheme.value;
    localStorage.theme = actualTheme.value;
}
</script>

<template>
    <v-app-bar :density="mobile ? 'compact' : 'default'">
        <v-row
            no-gutters
            justify="space-between"
        >
            <v-col cols="auto">
                <v-menu v-if="mobile">
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
            <v-spacer />
            <v-col
                class="mr-8"
                cols="auto"
            >
                <AlertResponse :response="productStore.res" />
            </v-col>
            <v-col
                class="border-sm pa-0"
                cols="auto"
            >
                <v-btn
                    class="h-100 pa-0"
                    color="primary"
                    :rounded="mobile ? 'circle' : 'lg'"
                    @click="toggleTheme"
                >
                    <v-icon
                        :size="mobile ? 30 : 35"
                        :icon="actualTheme === 'dark' ? mdiWeatherSunsetUp : mdiWeatherSunsetDown"
                    />
                </v-btn>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

//:class="isMobile ? 'rounded-xl' : 'rounded-lg'"
