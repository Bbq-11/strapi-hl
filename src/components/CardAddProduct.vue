<script setup>
import { mdiPlusCircleOutline, mdiWeatherSunsetUp } from '@mdi/js';
import { ref } from 'vue';

const isOpen = ref(false);

const props = defineProps({
    title: String,
    icon: String,
});
const switchOpen = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <v-btn
        class="w-100 d-flex justify-space-between text-h4 py-8 px-6"
        :prepend-icon="icon"
        :append-icon="mdiPlusCircleOutline"
        :text="title"
        @click="switchOpen"
    >
    </v-btn>
    <template>
        <v-dialog
            v-model="isOpen"
            width="auto"
        >
            <v-card
                class="text-center bg-error py-4 px-6 rounded-lg"
                elevation="12"
            >
                rf
            </v-card>
        </v-dialog>
    </template>
</template>

<style scoped></style>
