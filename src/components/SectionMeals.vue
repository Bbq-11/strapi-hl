<script setup>
import { mdiClose, mdiWeatherSunsetUp } from '@mdi/js';
import ListFoodDay from './ListFoodDay.vue';
import { useCalendarStore } from '../stores/Calendar.js';
import CardAddProductMeal from './CardAddProductMeal.vue';

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
        <v-card-title class="pa-0">
            <CardAddProductMeal
                :title="title"
                :day="day"
                :type="type"
                :icon="icon"
            />
        </v-card-title>
        <v-card-text class="pa-0 mt-0">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title class="px-6 mb-2">
                        <v-row
                            class="text-center"
                            no-gutters
                        >
                            <template v-for="(key, value, index) in calendarStore.summaryMeal(day, type).value">
                                <v-col>
                                    {{ key }}
                                </v-col>
                                <v-spacer v-if="index === 2" />
                            </template>
                        </v-row>
                        <template v-slot:actions />
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="border-t pt-2">
                        <ListFoodDay
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
