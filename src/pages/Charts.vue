<script setup>
import { reactive, ref } from 'vue';
import { useCalendarStore } from '../stores/Calendar.js';
import BarChart from '../components/BarChart.vue';

const calendarStore = useCalendarStore();

const actualDate = new Date();
const bb = ref([actualDate]);

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
                    class="scroll-container"
                    color="primary"
                    base-color="primary"
                    bg-color="background"
                    hide-details
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
    </v-card>
    <v-card class="mx-auto w-75 mb-8 text-center">
        <v-card-title class="mb-4 border-b">Средние показатели</v-card-title>
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
                    v-for="(key, value, index) in calendarStore.getInfoAllMealInGapDays(bb).value"
                    :key="index"
                >
                    <v-col>
                        {{ key > 0 ? key : '-' }}
                    </v-col>
                    <v-spacer v-if="index === 2" />
                </template>
            </v-row>
        </v-card-text>
    </v-card>
    <div v-if="calendarStore.getListActualDays(bb).value.length">
        <BarChart
            v-if="calendarStore.getListActualDays(bb).value.length < 30"
            :lst="calendarStore.getListActualDays(bb).value"
        />
        <BarChart
            v-else-if="calendarStore.getListActualDays(bb).value.length < 60"
            :lst="calendarStore.getInfoForWeek(bb).value"
        />
        <BarChart
            v-else
            :lst="calendarStore.getInfoForMonth(bb).value"
        />
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
