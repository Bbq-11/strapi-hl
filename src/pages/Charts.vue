<script setup>
import { computed, ref } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useCalendarStore } from '../stores/Calendar.js';
import { usePersonStore } from '../stores/Person.js';
import PersonalData from '../components/PersonalData.vue';
import BarCalories from '../components/BarCalories.vue';
import BarPFC from '../components/BarPFC.vue';
import { useDisplay } from 'vuetify';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const calendarStore = useCalendarStore();
const personStore = usePersonStore();

const actualDate = new Date();
const listDates = ref([actualDate]);

const listProperty = ['Белки', 'Жиры', 'Углеводы', 'Калории'];
const { name } = useDisplay();
const adaptiveWidth = computed(() => {
    switch (name.value) {
        case 'xs':
            return 300;
        case 'sm':
            return 400;
        case 'md':
            return '90%';
        case 'lg':
            return 920;
        case 'xl':
            return 1200;
        case 'xxl':
            return '75%';
        default:
            return '75%';
    }
});
</script>

<template>
    <v-sheet
        class="bg-transparent mx-auto table-container"
        :width="adaptiveWidth"
    >
        <PersonalData />
        <v-row
            class="justify-space-between flex-column flex-md-row ga-6 align-center mb-8 mb-sm-12"
            no-gutters
        >
            <v-col>
                <v-card class="text-primary py-2">
                    <v-card-title class="text-h6 text-sm-h5 text-center font-weight-bold text-wrap pa-0 mb-4">
                        Выберите диапозон дат
                    </v-card-title>
                    <v-card-text class="d-flex justify-center pa-0">
                        <v-sheet width="200">
                            <v-date-input
                                class="scroll-container pa-0"
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
                        </v-sheet>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card class="mx-auto text-primary text-center py-2">
                    <v-card-title
                        class="text-h6 text-sm-h5 text-center font-weight-bold text-wrap border-b pa-0 pb-2 pb-md-1 mb-4"
                    >
                        Средние показатели
                    </v-card-title>
                    <v-card-text class="pa-0">
                        <v-row
                            class="gc-6 gr-1 justify-center"
                            no-gutters
                        >
                            <template
                                v-for="(key, value, index) in calendarStore.getInfoAllMealInGapDays(listDates).value"
                                :key="index"
                            >
                                <v-col
                                    class="d-flex-column justify-center"
                                    cols="4"
                                    sm=""
                                >
                                    <p class="text-subtitle-2 text-sm-subtitle-1 mb-1">
                                        {{ listProperty[index] }}
                                    </p>
                                    <p class="text-caption text-sm-body-2">
                                        {{ key > 0 ? key : '-' }}
                                    </p>
                                    <p
                                        v-if="index === 3 && personStore.person.isActive && personStore.getStandard"
                                        class="ml-2 text-caption"
                                    >
                                        {{ Math.floor(((key / personStore.getStandard) * 100) / listDates.length) }}%
                                    </p>
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div v-if="calendarStore.getListActualDays(listDates).value.length">
            <div v-if="calendarStore.getListActualDays(listDates).value.length < 30">
                <p class="text-center text-h5 text-sm-h4 text-primary mb-4 mb-sm-6">По дням</p>
                <BarCalories :listData="calendarStore.getListActualDays(listDates).value" />
                <BarPFC :listData="calendarStore.getListActualDays(listDates).value" />
            </div>
            <div v-else-if="calendarStore.getListActualDays(listDates).value.length < 120">
                <p class="text-center text-h5 text-sm-h4 text-primary mb-6">По неделям</p>
                <BarCalories :listData="calendarStore.getInfoForWeek(listDates).value" />
                <BarPFC :listData="calendarStore.getInfoForWeek(listDates).value" />
            </div>
            <div v-else>
                <p class="text-center text-h5 text-sm-h4 text-primary mb-6">По месяцам</p>
                <BarCalories :listData="calendarStore.getInfoForMonth(listDates).value" />
                <BarPFC :listData="calendarStore.getInfoForMonth(listDates).value" />
            </div>
        </div>
    </v-sheet>
</template>
