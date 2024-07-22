<script setup>
import { computed, ref, watch } from 'vue';
import { mdiWeatherSunny, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { useCalendarStore } from '../stores/Calendar.js';
import SectionDiet from '../components/SectionDiet.vue';
import { useDisplay } from 'vuetify';

const calendarStore = useCalendarStore();

const formatDate = new Date();
const dateSelected = ref(formatDate);
const { name, mobile } = useDisplay();
const isMobile = ref(mobile.value);

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
const listProperty = ['Белки', 'Жиры', 'Углеводы', 'Калории'];

const adaptiveWidth = computed(() => {
    switch (name.value) {
        case 'xs':
            return 300;
        case 'sm':
            return 400;
        case 'md':
            return 580;
        case 'lg':
            return 880;
        default:
            return 880;
    }
});
const adaptiveContainer = computed(() => {
    switch (name.value) {
        case 'xs':
            return 300;
        case 'sm':
            return 400;
        case 'md':
            return 480;
        case 'lg':
            return 750;
        default:
            return 750;
    }
});
watch(
    () => mobile.value,
    () => (isMobile.value = mobile.value),
);
</script>

<template>
    <v-date-picker
        v-model="dateSelected"
        class="mx-auto bg-transparent mb-3 mb-sm-6"
        hide-header
        :width="isMobile ? 300 : 460"
        :max="formatDate"
        :min="(formatDate.getFullYear() - 10).toString()"
    />
    <v-card
        class="text-primary text-center mx-auto mb-8 mb-sm-12 py-2 py-md-4"
        :width="adaptiveWidth"
    >
        <v-card-title class="text-h6 text-sm-h5 text-center font-weight-bold pa-0 mb-2 mb-md-4 border-b-sm">
            Общие показатели
        </v-card-title>
        <v-card-text class="pa-0">
            <v-sheet
                class="mx-auto ml-sm-10 text-primary"
                :width="adaptiveContainer"
            >
                <v-row
                    class="justify-center gr-2"
                    no-gutters
                >
                    <template
                        v-for="(key, value, index) in calendarStore.getInfoAllMeal(dateSelected).value"
                        :key="value"
                    >
                        <v-col
                            class="d-flex-row justify-center"
                            cols="6"
                            sm=""
                        >
                            <p class="text-subtitle-2 text-sm-subtitle-1 mb-1">{{ listProperty[index] }}</p>
                            <p class="text-caption text-sm-body-2">
                                {{ key > 0 ? key : '-' }}
                            </p>
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
