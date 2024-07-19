<script setup>
import { computed, ref, watch } from 'vue';
import { mdiWeatherSunny, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';
import { useCalendarStore } from '../stores/Calendar.js';
import SectionDiet from '../components/SectionDiet.vue';
import { useDisplay } from 'vuetify';

const calendarStore = useCalendarStore();

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
const listProperty = ['Белки', 'Жиры', 'Углеводы', 'Калории'];

const { mobile } = useDisplay();
const mobileSize = ref(mobile.value);
watch(
    () => mobile.value,
    () => {
        mobileSize.value = mobile.value;
    },
);
</script>

<template>
    <v-date-picker
        v-model="dateSelected"
        class="mx-auto bg-transparent text-primary mb-6 scroll-container"
        color="primary"
        hide-header
        :width="mobileSize ? 300 : 460"
        :max="formatDate"
        :min="(formatDate.getFullYear() - 10).toString()"
    />
    <v-card class="mx-auto mb-12 text-center py-4 app-container">
        <v-card-title
            class="text-h6 text-sm-h5 text-center font-weight-bold text-wrap pa-0 mb-4 text-primary border-b-sm"
            >Общие показатели
        </v-card-title>
        <v-card-text class="pa-0">
            <v-sheet class="ml-10 text-primary calories-container">
                <v-row
                    class=""
                    no-gutters
                >
                    <template
                        v-for="(key, value, index) in calendarStore.getInfoAllMeal(dateSelected).value"
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
