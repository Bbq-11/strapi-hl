<script setup>
import { mdiClose } from '@mdi/js';
import { useCalendarStore } from '../stores/Calendar.js';
import CardEditFoodEaten from './CardEditFoodEaten.vue';
import { useDisplay } from 'vuetify';
import { computed, ref, watch } from 'vue';

const calendarStore = useCalendarStore();
const { name, mobile } = useDisplay();
const isMobile = ref(mobile.value);

const props = defineProps({
    day: Date,
    type: String,
});

const adaptiveWidthContainer = computed(() => {
    switch (name.value) {
        case 'xs':
            return '95%';
        case 'sm':
            return '95%';
        case 'md':
            return 480;
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
    <v-sheet
        v-for="item in calendarStore.getListOneMeal(day, type).value"
        :key="item.id"
        class="rounded-lg text-primary mb-2 mb-md-4 py-1 py-md-2 border-opacity-100"
        border="primary sm"
        :width="adaptiveWidthContainer"
    >
        <v-row
            class="align-center justify-space-between mb-1 mb-sm-2 px-2 px-md-4 text-caption text-sm-subtitle-1 text-md-h6"
            no-gutters
        >
            <v-col
                :class="[isMobile ? 'text-center' : 'text-left']"
                cols="12"
                sm="8"
            >
                {{ item.name }}
            </v-col>
            <v-col cols="auto">
                <CardEditFoodEaten :item="item" />
            </v-col>
            <v-col cols="auto">
                <v-btn
                    color="error"
                    variant="tonal"
                    :size="isMobile ? 30 : 35"
                    :icon="mdiClose"
                    @click="calendarStore.removeMeal(day, type, item.id)"
                />
            </v-col>
        </v-row>
        <v-divider class="mb-sm-2 mx-2 primary opacity-100" />
        <v-card class="pa-0 text-primary text-caption text-sm-body-2 elevation-0">
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
