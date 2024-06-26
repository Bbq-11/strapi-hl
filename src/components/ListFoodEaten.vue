<script setup>
import { mdiAutorenew, mdiClose, mdiGaugeEmpty, mdiPencil } from '@mdi/js';
import { useCalendarStore } from '../stores/Calendar.js';

const calendarStore = useCalendarStore();

const props = defineProps({
    day: Object,
    type: String,
});
const checkValidNumValues = (value) => {
    return /^([1-9][0-9]{0,4}(\.[0-9]{0,2})?|0\.[0-9]{0,3})$/.test(value);
};
const pups = (value) => {
    const NUMERIC_REGEXP = /[-]{0,1}[\d]*[,]?[\d]*[.]{0,1}[\d]+/g;
    return value.match(NUMERIC_REGEXP).join('');
};
</script>

<template>
    <v-sheet
        v-for="item in calendarStore.getListOneMeal(day, type).value"
        class="pa-2 rounded-lg text-primary mb-2 border-opacity-100"
        border="primary sm"
    >
        <v-row
            class="gc-16 align-center mb-2"
            no-gutters
        >
            <v-col class="text-h5 px-4"> {{ item.name }}</v-col>
            <v-col cols="auto">
                <!--                <v-text-field-->
                <!--                    class="text-primary px-4 rounded-lg"-->
                <!--                    width="80px"-->
                <!--                    base-color="surface-add"-->
                <!--                    variant="underlined"-->
                <!--                    type="number"-->
                <!--                    min="0"-->
                <!--                    persistent-placeholder-->
                <!--                    placeholder="0"-->
                <!--                    :rules="[checkValidNumValues]"-->
                <!--                    maxlength="5"-->
                <!--                    hide-details-->
                <!--                    hide-spin-buttons-->
                <!--                    suffix="г."-->
                <!--                    v-model="item.weight"-->
                <!--                >-->
                <!--                </v-text-field>-->
                <div class="d-flex justify-space-between align-center">
                    <v-icon
                        class="mr-2"
                        size="20"
                    >
                        {{ mdiPencil }}
                    </v-icon>
                    <v-text-field
                        variant="underlined"
                        color="transparent"
                        base-color="transparent"
                        bg-color="transparent"
                        width="60px"
                        suffix="г"
                        v-model="item.weight"
                        @update:model-value="item.weight = pups(item.weight)"
                        :rules="[pups]"
                        maxlength="5"
                        autocomplete="off"
                    />
                </div>
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

        <v-divider
            class="mb-2 ml-0"
            color="primary"
            opacity="100"
        />
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
