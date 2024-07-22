<script setup>
import { computed, ref, watch } from 'vue';
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
const { name, mobile } = useDisplay();

const isMobile = ref(mobile.value);
const actualDate = new Date();
const listDates = ref([actualDate]);

const listProperty = ['Белки', 'Жиры', 'Углеводы', 'Калории'];

const getPercentageOfProgress = computed(() => {
    const res = calendarStore.getInfoAllMealInGapDays(listDates.value).value.calories;
    return Math.floor(((res / personStore.getStandard) * 100) / listDates.value.length) || 0;
});
const checkActivePerson = computed(() => personStore.person.isActive && personStore.getStandard);
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
        default:
            return '75%';
    }
});

watch(
    () => mobile.value,
    () => (isMobile.value = mobile.value),
);
</script>
<template>
    <v-sheet
        class="bg-transparent mx-auto"
        :width="adaptiveWidth"
    >
        <PersonalData />
        <v-row
            class="align-center justify-space-between ga-4 gr-sm-8 mb-12 mb-md-16"
            no-gutters
        >
            <v-col>
                <v-row
                    class="justify-space-between flex-column flex-md-row ga-6 align-center flex-wrap"
                    no-gutters
                >
                    <v-col
                        cols=""
                        :md="checkActivePerson ? 12 : 6"
                    >
                        <v-card class="text-primary py-2 py-sm-4 py-md-6">
                            <v-card-title
                                class="text-h6 text-sm-h5 text-center font-weight-bold text-wrap pa-0 mb-2 mb-sm-4"
                            >
                                Выберите диапозон дат
                            </v-card-title>
                            <v-card-text class="d-flex justify-center pa-0">
                                <v-sheet :width="isMobile ? 165 : 210">
                                    <v-date-input
                                        v-model="listDates"
                                        color="primary"
                                        base-color="primary"
                                        bg-color="background"
                                        placeholder="Выберите"
                                        multiple="range"
                                        variant="outlined"
                                        prepend-icon=""
                                        ok-text="Выбрать"
                                        autocomplete="off"
                                        hide-details
                                        :density="isMobile ? 'compact' : 'comfortable'"
                                        :max="actualDate"
                                        :min="(actualDate.getFullYear() - 10).toString()"
                                    />
                                </v-sheet>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card class="mx-auto text-primary text-center py-2 py-sm-4 py-md-6">
                            <v-card-title
                                class="text-h6 text-sm-h5 text-center font-weight-bold text-wrap border-b pa-0 pb-sm-2 mb-2 mb-md-4"
                            >
                                Средние показатели
                            </v-card-title>
                            <v-card-text class="pa-0">
                                <v-row
                                    class="gc-6 justify-center"
                                    no-gutters
                                >
                                    <template
                                        v-for="(key, value, index) in calendarStore.getInfoAllMealInGapDays(listDates)
                                            .value"
                                        :key="value"
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
                                        </v-col>
                                    </template>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
            <v-col
                v-if="checkActivePerson"
                class="d-flex justify-center"
                cols="12"
                md="5"
            >
                <v-progress-circular
                    class="text-h6 text-sm-h5 text-primary"
                    width="15"
                    :model-value="getPercentageOfProgress"
                    :size="isMobile ? 200 : 240"
                >
                    <template #default>
                        <div class="d-flex-column align-center text-center">
                            <span>{{ getPercentageOfProgress }} %</span>
                            <p class="text-caption text-sm-body-2">от суточной нормы</p>
                        </div>
                    </template>
                </v-progress-circular>
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
