<script setup>
import { ref } from 'vue';
import SectionMeals from '../components/SectionMeals.vue';
import { mdiWeatherSunny, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { useCalendarStore } from '../stores/Calendar.js';

const formatCurrentDate = (currentDate) => {
    const dtYear = currentDate.getFullYear();
    const dtMonth = currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`;
    const dtDay = currentDate.getDate() >= 10 ? currentDate.getDate() : `0${currentDate.getDate()}`;
    return `${dtYear}-${dtMonth}-${dtDay}`;
};

const formatDate = new Date();
const dateSelected = ref(formatDate);

const calendarStore = useCalendarStore();

const weekdays = [
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
        class="mx-auto mb-6"
        title=""
        v-model="dateSelected"
        :max="formatDate"
        :min="(formatDate.getFullYear() - 2).toString()"
    />
    <v-card class="mx-auto w-75 mb-16 text-center">
        <v-card-title class="mb-4 border-b">Общие показатели</v-card-title>
        <v-card-text class="pa-0 mb-4 mx-6">
            <v-row
                class="mb-2"
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
    <SectionMeals
        v-for="weekday in weekdays"
        :day="dateSelected"
        :title="weekday.title"
        :type="weekday.field"
        :icon="weekday.icon"
    />
</template>

<style scoped></style>
