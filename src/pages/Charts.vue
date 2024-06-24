<script setup>
import { reactive, ref } from 'vue';
import { useCalendarStore } from '../stores/Calendar.js';
import acq from '../components/acq.vue';

const calendarStore = useCalendarStore();

const actualDate = new Date();
const bb = ref([actualDate]);
const actualMeals = ref(calendarStore.summaryAllMealAllDays(bb).value);

const getStatisticsDays = () => {
    actualMeals.value = calendarStore.summaryAllMealAllDays(bb).value;
};

// function formatDate(dateString) {
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0];
// }

const clickkk = () => {
    if (bb.value) getStatisticsDays();
};

import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
</script>

<template>
    <v-card
        class="mx-auto text-center mt-6 mb-8"
        width="450px"
    >
        <v-card-title class="mb-4"> Диапозон дат для статистики</v-card-title>
        <v-card-text class="d-flex justify-center">
            <div class="w-50">
                <v-date-input
                    :max="actualDate"
                    :min="(actualDate.getFullYear() - 2).toString()"
                    variant="outlined"
                    prepend-icon=""
                    placeholder="dd/mm/yyyy"
                    cancel-text="ff"
                    ok-text="okk"
                    density="comfortable"
                    autocomplete="off"
                    v-model="bb"
                    multiple="range"
                />
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn
                block
                @click="clickkk"
                text="Считай"
            />
        </v-card-actions>
    </v-card>
    <v-card class="mx-auto w-75 mb-8 text-center">
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
                <template
                    v-for="(key, value, index) in actualMeals"
                    :key="index"
                >
                    <v-col>
                        {{ key }}
                    </v-col>
                    <v-spacer v-if="index === 2" />
                </template>
            </v-row>
        </v-card-text>
    </v-card>
    <div v-if="calendarStore.getListActualDays(bb).value.length > 1">
        <acq :lst="calendarStore.getListActualDays(bb).value" />
    </div>
    <div v-else>gecnj cer</div>
</template>

<style scoped></style>

<!--<v-date-input-->
<!--    :max="actualDate"-->
<!--    border="lg"-->
<!--    hide-input-->
<!--    :min="(actualDate.getFullYear() - 2).toString()"-->
<!--    variant="outlined"-->
<!--    placeholder="mm/dd/yyyy - mm/dd/yyyy"-->
<!--    max-width="450px"-->
<!--    cancel-text="ff"-->
<!--    ok-text="okk"-->
<!--    clearable-->
<!--    density="comfortable"-->
<!--    autocomplete="off"-->
<!--    v-model="bb"-->
<!--    multiple="range"-->
<!--/>-->
