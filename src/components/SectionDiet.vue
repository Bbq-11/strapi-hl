<script setup>
import ListFood from './ListFoodEaten.vue';
import CardAddingFood from './CardAddingFoodEaten.vue';
import { useCalendarStore } from '../stores/Calendar.js';
import { useDisplay } from 'vuetify';
import { computed } from 'vue';

const calendarStore = useCalendarStore();

const props = defineProps({
    day: Date,
    type: String,
    title: String,
    icon: String,
});
const { name } = useDisplay();
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
            return '100%';
        case 'sm':
            return 300;
        case 'md':
            return 480;
        case 'lg':
            return 750;
        default:
            return 750;
    }
});
</script>

<template>
    <v-card
        class="text-primary mx-auto rounded-lg mb-4 mb-sm-6"
        :width="adaptiveWidth"
    >
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
            class="py-0 mb-4"
        >
            <v-expansion-panels>
                <v-expansion-panel class="rounded-t-0 rounded-b-lg">
                    <v-expansion-panel-title
                        class="border-t-lg border-opacity-100 border-primary"
                        hide-actions
                    >
                        <v-sheet :width="adaptiveContainer">
                            <v-row
                                class="text-center text-primary text-caption text-sm-subtitle-2"
                                no-gutters
                            >
                                <template
                                    v-for="(key, value, index) in calendarStore.getInfoOneMeal(day, type).value"
                                    :key="value"
                                >
                                    <v-col>
                                        {{ key }}
                                    </v-col>
                                    <v-spacer v-if="index === 2" />
                                </template>
                            </v-row>
                        </v-sheet>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-card
                            class="overflow-y-auto scroll-container elevation-0"
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
