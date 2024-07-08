<script setup>
import { ref } from 'vue';
import { mdiWeatherSunny, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { useCalendarStore } from '../stores/Calendar.js';
import { usePersonStore } from '../stores/Person.js';
import SectionDiet from '../components/SectionDiet.vue';

const calendarStore = useCalendarStore();
const personStore = usePersonStore();

const formatDate = new Date();
const dateSelected = ref(formatDate);

const listDiet = [
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
        class="mx-auto bg-transparent text-primary mb-6 scroll-container"
        color="primary"
        width="400px"
        hide-header
        v-model="dateSelected"
        :max="formatDate"
        :min="(formatDate.getFullYear() - 10).toString()"
    />
    <v-card class="mx-auto mb-12 text-center pa-0 app-container">
        <v-card-title class="mb-4 text-primary text-h5 border-b-sm">Общие показатели</v-card-title>
        <v-card-text class="pa-0 mb-4">
            <v-sheet class="ml-10 text-primary calories-container">
                <v-row
                    class="mb-1 text-subtitle-1"
                    no-gutters
                >
                    <v-col> Белки</v-col>
                    <v-col> Жиры</v-col>
                    <v-col> Углеводы</v-col>
                    <v-spacer />
                    <v-col> Каллории</v-col>
                </v-row>
                <v-row
                    class="text-subtitle-2"
                    no-gutters
                >
                    <template v-for="(key, value, index) in calendarStore.getInfoAllMeal(dateSelected).value">
                        <v-col>
                            {{ key > 0 ? key : '-' }}
                            <span
                                v-if="index === 3 && personStore.person.isActive"
                                class="ml-2"
                            >
                                ({{ Math.floor((key / personStore.getStandard) * 100) }} %)</span
                            >
                        </v-col>
                        <v-spacer v-if="index === 2" />
                    </template>
                </v-row>
            </v-sheet>
        </v-card-text>
    </v-card>
    <SectionDiet
        v-for="item in listDiet"
        :key="item.id"
        :day="dateSelected"
        :title="item.title"
        :type="item.field"
        :icon="item.icon"
    />
</template>
