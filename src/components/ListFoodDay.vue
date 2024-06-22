<script setup>
import { mdiClose } from '@mdi/js';
import { useCalendarStore } from '../stores/Calendar.js';

const calendarStore = useCalendarStore();

const props = defineProps({
    day: Object,
    type: String,
});
</script>

<template>
    <v-container v-for="item in calendarStore.getMeal(day, type)">
        <v-row
            class="gc-16 mb-4 align-center"
            no-gutters
        >
            <v-col class="text-h5 border-lg"> {{ item.name }}</v-col>
            <v-col cols="auto">
                <v-text-field
                    width="100px"
                    variant="outlined"
                    hideDetails="auto"
                    density="compact"
                    autocomplete="off"
                    suffix="г."
                    v-model="item.weight"
                >
                </v-text-field>
            </v-col>
            <v-col cols="auto">
                <v-btn
                    :icon="mdiClose"
                    color="error"
                    variant="tonal"
                    @click="calendarStore.removeMeal(day, type, item.id)"
                />
            </v-col>
        </v-row>
        <v-row
            class="mr-10"
            no-gutters
        >
            <v-col>{{ item.proteins }}</v-col>
            <v-col>{{ item.fats }}</v-col>
            <v-col class="mr-4">{{ item.carbs }}</v-col>
            <v-col>{{ item.calories }}</v-col>
        </v-row>
    </v-container>
</template>

<style scoped></style>
