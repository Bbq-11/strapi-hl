<script setup>
import { ref } from 'vue';
import { useCalendarStore } from '../stores/Calendar.js';
import BarChart from '../components/BarChart.vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import PersonalData from '../components/PersonalData.vue';
import { usePersonStore } from '../stores/Person.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const calendarStore = useCalendarStore();
const personStore = usePersonStore();
const actualDate = new Date();
const listDates = ref([actualDate]);
</script>

<template>
    <PersonalData />
    <v-row
        class="justify-space-between align-center mb-12"
        no-gutters
    >
        <v-col cols="5">
            <v-card class="text-primary">
                <v-card-title class="mb-2 text-h5 font-weight-bold text-center"> Выберите диапозон дат</v-card-title>
                <v-card-text class="d-flex justify-center">
                    <div class="w-50">
                        <v-date-input
                            class="scroll-container"
                            color="primary"
                            base-color="primary"
                            bg-color="background"
                            placeholder="Выберите"
                            hide-details
                            multiple="range"
                            variant="outlined"
                            prepend-icon=""
                            ok-text="Выбрать"
                            density="comfortable"
                            autocomplete="off"
                            :max="actualDate"
                            :min="(actualDate.getFullYear() - 10).toString()"
                            v-model="listDates"
                        />
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="6">
            <v-card class="mx-auto text-primary text-center">
                <v-card-title class="mb-2 border-b text-h5 font-weight-bold">Средние показатели</v-card-title>
                <v-card-text class="pa-0 mb-4 mx-6">
                    <v-row
                        class="mb-1 text-subtitle-1"
                        no-gutters
                    >
                        <v-col> Белки</v-col>
                        <v-col> Жиры</v-col>
                        <v-col> Углеводы</v-col>
                        <v-col> Каллории</v-col>
                    </v-row>
                    <v-row no-gutters>
                        <template
                            v-for="(key, value, index) in calendarStore.getInfoAllMealInGapDays(listDates).value"
                            :key="index"
                        >
                            <v-col>
                                {{ key > 0 ? key : '-' }}
                                <span v-if="index === 3 && personStore.person.isActive">
                                    ({{ Math.floor(((key / personStore.getStandard) * 100) / listDates.length) }}
                                    %)
                                </span>
                            </v-col>
                        </template>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <div v-if="calendarStore.getListActualDays(listDates).value.length">
        <BarChart
            v-if="calendarStore.getListActualDays(listDates).value.length < 30"
            :lst="calendarStore.getListActualDays(listDates).value"
            type="День"
        />
        <BarChart
            v-else-if="calendarStore.getListActualDays(listDates).value.length < 120"
            :lst="calendarStore.getInfoForWeek(listDates).value"
            type="Неделя"
        />
        <BarChart
            v-else
            :lst="calendarStore.getInfoForMonth(listDates).value"
            type="Месяц"
        />
    </div>
</template>
