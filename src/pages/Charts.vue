<script setup>
import { ref } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useCalendarStore } from '../stores/Calendar.js';
import { usePersonStore } from '../stores/Person.js';
import PersonalData from '../components/PersonalData.vue';
import BarCalories from '../components/BarCalories.vue';
import BarPFC from '../components/BarPFC.vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const calendarStore = useCalendarStore();
const personStore = usePersonStore();

const actualDate = new Date();
const listDates = ref([actualDate]);
</script>

<template>
    <v-sheet class="bg-transparent mx-auto table-container">
        <PersonalData />
        <v-row
            class="justify-space-between align-center mb-12"
            no-gutters
        >
            <v-col cols="5">
                <v-card class="text-primary">
                    <v-card-title class="mb-2 text-h5 text-center"> Выберите диапозон дат</v-card-title>
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
                    <v-card-title class="mb-2 border-b text-h5"> Средние показатели</v-card-title>
                    <v-card-text class="pa-0 mb-4 mx-2">
                        <v-row
                            class="mb-1 text-subtitle-1 gc-4"
                            no-gutters
                        >
                            <v-col> Белки</v-col>
                            <v-col> Жиры</v-col>
                            <v-col> Углеводы</v-col>
                            <v-col cols="4"> Каллории</v-col>
                        </v-row>
                        <v-row
                            class="text-body-1 gc-4"
                            no-gutters
                        >
                            <template
                                v-for="(key, value, index) in calendarStore.getInfoAllMealInGapDays(listDates).value"
                                :key="index"
                            >
                                <v-col
                                    class="d-flex justify-center"
                                    :cols="index === 3 ? 4 : ''"
                                >
                                    {{ key > 0 ? key : '-' }}
                                    <span
                                        v-if="index === 3 && personStore.person.isActive && personStore.getStandard"
                                        class="ml-2"
                                    >
                                        (
                                        {{ Math.floor(((key / personStore.getStandard) * 100) / listDates.length) }}
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
            <div v-if="calendarStore.getListActualDays(listDates).value.length < 30">
                <p class="text-center text-h4 text-primary mb-6">По дням</p>
                <BarCalories :listData="calendarStore.getListActualDays(listDates).value" />
                <BarPFC :listData="calendarStore.getListActualDays(listDates).value" />
            </div>
            <div v-else-if="calendarStore.getListActualDays(listDates).value.length < 120">
                <p class="text-center text-h4 text-primary mb-6">По неделям</p>
                <BarCalories :listData="calendarStore.getInfoForWeek(listDates).value" />
                <BarPFC :listData="calendarStore.getInfoForWeek(listDates).value" />
            </div>
            <div v-else>
                <p class="text-center text-h4 text-primary mb-6">По месяцам</p>
                <BarCalories :listData="calendarStore.getInfoForMonth(listDates).value" />
                <BarPFC :listData="calendarStore.getInfoForMonth(listDates).value" />
            </div>
        </div>
    </v-sheet>
</template>
