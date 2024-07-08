<script setup>
import { mdiClose } from '@mdi/js';
import { useCalendarStore } from '../stores/Calendar.js';
import CardEditFoodEaten from './CardEditFoodEaten.vue';

const calendarStore = useCalendarStore();

const props = defineProps({
    day: Date,
    type: String,
});
</script>

<template>
    <v-sheet
        v-for="item in calendarStore.getListOneMeal(day, type).value"
        class="py-2 rounded-lg text-primary mb-2 border-opacity-100 calories-container"
        border="primary sm"
        :key="item.id"
    >
        <v-row
            class="align-center justify-space-between mb-2 px-4 text-subtitle-2"
            no-gutters
        >
            <v-col cols="8">
                {{ item.name }}
            </v-col>
            <v-col cols="auto">
                <CardEditFoodEaten :item="item" />
            </v-col>
            <v-col cols="auto">
                <v-btn
                    color="error"
                    variant="tonal"
                    size="35"
                    :icon="mdiClose"
                    @click="calendarStore.removeMeal(day, type, item.id)"
                />
            </v-col>
        </v-row>
        <v-divider class="mb-2 mx-2 primary opacity-100" />
        <v-card class="pa-0 text-primary text-body-1 elevation-0">
            <v-row
                class="text-center"
                no-gutters
            >
                <v-col>{{ +(item.proteins * (item.weight / 100)).toFixed(2) }}</v-col>
                <v-col>{{ +(item.fats * (item.weight / 100)).toFixed(2) }}</v-col>
                <v-col>{{ +(item.carbs * (item.weight / 100)).toFixed(2) }}</v-col>
                <v-spacer />
                <v-col>{{ +(item.calories * (item.weight / 100)).toFixed(2) }}</v-col>
            </v-row>
        </v-card>
    </v-sheet>
</template>
