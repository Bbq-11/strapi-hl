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
    <v-sheet
        v-for="item in calendarStore.getListOneMeal(day, type).value"
        class="pa-2 rounded-lg text-primary mb-2 border-opacity-100"
        border="primary sm"
    >
        <v-row
            class="gc-16 align-center border-b-sm mb-2"
            no-gutters
        >
            <v-col class="text-h5 py-2 px-4"> {{ item.name }}</v-col>
            <v-col cols="auto">
                <v-text-field
                    class="bg-surface-add px-4 rounded-lg"
                    hide-details="auto"
                    base-color="surface-add"
                    color="surface-add"
                    variant="underlined"
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
                    size="30"
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
    </v-sheet>
</template>

<style scoped></style>
