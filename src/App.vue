<script setup>
import { onBeforeMount, ref } from 'vue';

import {
    mdiWeatherSunsetUp,
    mdiWeatherSunny,
    mdiWeatherSunsetDown,
    mdiPlusCircleOutline,
    mdiDeleteOutline,
    mdiClose,
} from '@mdi/js';

import { useProductStore } from './stores/Products.js';
import Guide from './pages/Guide.vue';
import Home from './pages/Home.vue';

const productStore = useProductStore();

const tab = ref(1);

onBeforeMount(() => productStore.addProducts());
</script>

<template>
    <v-sheet class="app-container mx-auto">
        <v-tabs
            v-model="tab"
            align-tabs="center"
            class="rounded-xl"
            color="deep-purple-accent-4"
        >
            <v-tab
                :value="1"
                class="rounded-lg"
            >
                Главная
            </v-tab>
            <v-tab
                :value="2"
                class="rounded-lg"
            >
                Справочник
            </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">
                <Home />
            </v-tabs-window-item>
        </v-tabs-window>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="2">
                <Guide />
            </v-tabs-window-item>
        </v-tabs-window>
    </v-sheet>
</template>

<style scoped></style>

<!--width="600"-->
<!--color="green"-->
<!--v-model="dateSelected"-->
<!--:allowed-dates="allowedDates"-->
<!--max="2018-03-20"-->
<!--min="2016-06-15"-->
<!--show-adjacent-months-->
