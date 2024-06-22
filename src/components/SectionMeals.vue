<script setup>
import { mdiClose, mdiWeatherSunsetUp } from '@mdi/js';
import ListFoodDay from './ListFoodDay.vue';
import CardAddProductBreakfast from './CardAddProductBreakfast.vue';
import { useCalendarStore } from '../stores/Calendar.js';

const calendarStore = useCalendarStore();

const props = defineProps({
    day: Object,
    type: String,
    title: String,
    icon: String,
});
</script>

<template>
    <v-card class="w-75 h-100 pa-0 my-0 mx-auto rounded-lg mb-6">
        <v-card-title class="text-green pa-0">
            <CardAddProductBreakfast
                :title="title"
                :day="day"
                :type="type"
                :icon="icon"
            />
        </v-card-title>
        <v-card-text class="pa-0 mt-0">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title class="px-6">
                        <v-row class="mr-5">
                            <v-col>{{ calendarStore.summaryMeal(day, type).proteins }}</v-col>
                            <v-col>{{ calendarStore.summaryMeal(day, type).fats }}</v-col>
                            <v-col class="mr-4">{{ calendarStore.summaryMeal(day, type).carbs }}</v-col>
                            <v-col>{{ calendarStore.summaryMeal(day, type).calories }}</v-col>
                        </v-row>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="mt-2">
                        <ListFoodDay
                            class="mb-6"
                            :day="day"
                            :type="type"
                        />
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped></style>
