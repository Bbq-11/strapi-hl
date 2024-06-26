<script setup>
import { ref } from 'vue';
import SectionDiet from '../components/SectionDiet.vue';
import { mdiWeatherSunny, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { useCalendarStore } from '../stores/Calendar.js';

const calendarStore = useCalendarStore();

const formatDate = new Date();
const dateSelected = ref(formatDate);

const diet = [
    {
        title: 'Завтрак',
        field: 'breakfast',
        icon: mdiWeatherSunsetUp,
    },
    {
        title: 'Обед',
        field: 'lunch',
        icon: mdiWeatherSunny,
    },
    {
        title: 'Ужин',
        field: 'dinner',
        icon: mdiWeatherSunsetDown,
    },
];
</script>

<template>
    <v-date-picker
        class="mx-auto bg-transparent text-primary mb-6 rounded-xl px-4 py-4 scroll-container"
        width="40%"
        hide-header
        v-model="dateSelected"
        :max="formatDate"
        :min="(formatDate.getFullYear() - 2).toString()"
    />
    <v-card
        class="mx-auto text-primary w-75 mb-16 text-center"
        border="primary sm"
    >
        <v-card-title class="mb-4 font-weight-bold text-h5 border-b-sm">Общие показатели</v-card-title>
        <v-card-text class="pa-0 mb-4 mx-6">
            <v-row
                class="mb-2 text-subtitle-1"
                no-gutters
            >
                <v-col> Белки</v-col>
                <v-col> Жиры</v-col>
                <v-col> Углеводы</v-col>
                <v-spacer />
                <v-col> Каллории</v-col>
            </v-row>
            <v-row no-gutters>
                <template v-for="(key, value, index) in calendarStore.summaryAllMeal(dateSelected).value">
                    <v-col>
                        {{ key }}
                    </v-col>
                    <v-spacer v-if="index === 2" />
                </template>
            </v-row>
        </v-card-text>
    </v-card>
    <SectionDiet
        v-for="item in diet"
        :day="dateSelected"
        :title="item.title"
        :type="item.field"
        :icon="item.icon"
    />
</template>
