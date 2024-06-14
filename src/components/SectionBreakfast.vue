<script setup>
import { mdiClose, mdiWeatherSunsetUp } from '@mdi/js';
import ListFood from './ListFood.vue';
import CardAddFood from './CardAddFood.vue';
</script>

<template>
    <v-card class="w-75 h-100 pa-0 my-0 mx-auto rounded-lg mb-6">
        <v-card-title class="text-green pa-0">
            <CardAddFood
                title="Завтрак"
                :icon="mdiWeatherSunsetUp"
            />
        </v-card-title>
        <v-card-text class="pa-0 mt-0">
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-title class="px-6">
                        <v-row class="mr-5">
                            <v-col>Бел</v-col>
                            <v-col>Жир</v-col>
                            <v-col class="mr-4">Угл</v-col>
                            <v-col>Калл</v-col>
                        </v-row>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="mt-2">
                        <ListFood class="mb-6" />
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
</template>

<style scoped></style>
