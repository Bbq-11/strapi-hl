<script setup>
import { ref } from 'vue';
import { useDate } from 'vuetify';
import { ru } from 'vuetify/locale';
import {
    mdiWeatherSunsetUp,
    mdiWeatherSunny,
    mdiWeatherSunsetDown,
    mdiPlusCircleOutline,
    mdiDeleteOutline,
    mdiClose,
} from '@mdi/js';
import SectionBreakfast from './components/SectionBreakfast.vue';
import GuideProducts from './components/GuideProducts.vue';

const tab = ref('1');

const formatCurrentDate = (currentDate) => {
    const dtYear = currentDate.getFullYear();
    const dtMonth = currentDate.getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`;
    const dtDay = currentDate.getDate() >= 10 ? new Date().getDate() : `0${new Date().getDate()}`;
    return `${dtYear}-${dtMonth}-${dtDay}`;
};

const formatDate = new Date();
const dateSelected = ref(formatDate);

const bb = ref('1');
</script>

<template>
    <v-sheet class="app-container mx-auto rounded-xl mt-4 border-xl">
        <v-tabs
            v-model="tab"
            align-tabs="center"
            class="rounded-xl"
            color="deep-purple-accent-4"
        >
            <!--            <v-tab-->
            <!--                :value="1"-->
            <!--                class="rounded-lg"-->
            <!--            >-->
            <!--                Главная-->
            <!--            </v-tab>-->
            <v-tab
                :value="3"
                class="rounded-lg"
            >
                Справочник
            </v-tab>
        </v-tabs>

        <!--        <v-tabs-window v-model="tab">-->
        <!--            <v-tabs-window-item :value="1">-->
        <!--                <v-date-picker-->
        <!--                    class="mx-auto"-->
        <!--                    :locale="ru"-->
        <!--                    title=""-->
        <!--                    v-model="dateSelected"-->
        <!--                    :max="formatDate"-->
        <!--                    :min="(formatDate.getFullYear() - 2).toString()"-->
        <!--                />-->
        <!--                <SectionBreakfast />-->
        <!--            </v-tabs-window-item>-->
        <!--        </v-tabs-window>-->
        <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="3">
                <GuideProducts />
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
