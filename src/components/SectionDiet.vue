<script setup>
import { mdiClose, mdiWeatherSunsetUp } from '@mdi/js';
import ListFood from './ListFoodEaten.vue';
import { useCalendarStore } from '../stores/Calendar.js';
import CardAddingFood from './CardAddingFoodEaten.vue';

const calendarStore = useCalendarStore();

const props = defineProps({
    day: Object,
    type: String,
    title: String,
    icon: String,
});
</script>

<template>
    <v-card class="w-75 text-primary h-100 pa-0 my-0 mx-auto rounded-lg mb-6">
        <v-card-title class="pa-0">
            <CardAddingFood
                :title="title"
                :day="day"
                :type="type"
                :icon="icon"
            />
        </v-card-title>
        <v-card-text
            v-if="calendarStore.getListOneMeal(day, type).value.length"
            class="pa-0 mt-0"
        >
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title class="">
                        <v-row
                            class="text-center text-primary"
                            no-gutters
                        >
                            <template v-for="(key, value, index) in calendarStore.getInfoOneMeal(day, type).value">
                                <v-col>
                                    {{ key }}
                                </v-col>
                                <v-spacer v-if="index === 2" />
                            </template>
                        </v-row>
                        <template v-slot:actions />
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-card
                            class="overflow-y-auto scroll-container elevation-0 py-4"
                            max-height="300px"
                        >
                            <ListFood
                                :day="day"
                                :type="type"
                            />
                        </v-card>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped></style>
