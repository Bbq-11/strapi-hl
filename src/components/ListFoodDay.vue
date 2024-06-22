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
    <div
        v-for="item in calendarStore.getMeal(day, type)"
        class="pb-2 mb-4 border-b"
    >
        <v-row
            class="gc-16 mb-2 align-center"
            no-gutters
        >
            <v-col class="text-h5 border-sm rounded-xl py-2 px-4"> {{ item.name }}</v-col>
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
            class="text-center"
            no-gutters
        >
            <v-col>{{ +(item.proteins * (item.weight / 100)).toFixed(2) }}</v-col>
            <v-col>{{ +(item.fats * (item.weight / 100)).toFixed(2) }}</v-col>
            <v-col>{{ +(item.carbs * (item.weight / 100)).toFixed(2) }}</v-col>
            <v-spacer />
            <v-col>{{ +(item.calories * (item.weight / 100)).toFixed(2) }}</v-col>
        </v-row>
    </div>
</template>

<style scoped></style>
