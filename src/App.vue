<script setup>
import { ref } from 'vue';
import { useDate } from 'vuetify';
import { ru } from 'vuetify/locale';
import {
    mdiWeatherSunsetUp,
    mdiWeatherSunny,
    mdiWeatherSunsetDown,
    mdiPlusCircleOutline,
    mdiDeleteOutline,
    mdiClose,
} from '@mdi/js';

const tab = ref('1');

const getCurrentDate = () => {
    const dtYear = new Date().getFullYear();
    const dtMonth = new Date().getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`;
    const dtDay = new Date().getDate() >= 10 ? new Date().getDate() : `0${new Date().getDate()}`;
    return `${dtYear}-${dtMonth}-${dtDay}`;
};
const formatDate = new Date(getCurrentDate());
const dateSelected = ref(formatDate);

const bb = ref('1');
</script>

<template>
    <v-sheet class="app-container mx-auto rounded-xl mt-8 border-xl">
        <v-tabs
            v-model="tab"
            align-tabs="center"
            class="rounded-xl"
            color="deep-purple-accent-4"
        >
            <v-tab
                :value="1"
                class="rounded-lg"
                >Главная
            </v-tab>
            <!--            <v-tab :value="2" class="rounded-lg">Статистика</v-tab>-->
            <!--            <v-tab :value="3" class="rounded-lg">Справочник</v-tab>-->
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item :value="1">
                <v-date-picker
                    class="mx-auto"
                    :locale="ru"
                    v-model="dateSelected"
                    :max="formatDate"
                    :min="(formatDate.getFullYear() - 1).toString()"
                ></v-date-picker>
                <v-card class="w-75 h-100 pa-0 my-0 mx-auto rounded-lg mb-6">
                    <v-card-title class="text-green pa-0">
                        <v-btn
                            class="w-100 d-flex justify-space-between text-h4 py-8 px-6"
                            :prepend-icon="mdiWeatherSunsetUp"
                            :append-icon="mdiPlusCircleOutline"
                            @click="bb++"
                        >
                            {{ bb }}
                        </v-btn>
                    </v-card-title>
                    <v-card-text
                        v-if="bb"
                        class="pa-0 mt-0"
                    >
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-title class="px-6">
                                    <v-row
                                        class="mr-5"
                                        no-gutters
                                    >
                                        <v-col>Бел</v-col>
                                        <v-col>Жир</v-col>
                                        <v-col class="mr-4">Угл</v-col>
                                        <v-col>Калл</v-col>
                                    </v-row>
                                </v-expansion-panel-title>
                                <v-expansion-panel-text class="mt-2">
                                    <div class="mb-6 rounded-lg">
                                        <v-row
                                            class="gc-16 mb-4 align-center justify-space-between"
                                            no-gutters
                                        >
                                            <v-col class="text-h5 border-lg"> Творог</v-col>
                                            <v-col cols="auto">
                                                <v-text-field
                                                    width="100px"
                                                    variant="outlined"
                                                    hideDetails="auto"
                                                    density="compact"
                                                    autocomplete="off"
                                                    suffix="г."
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="auto">
                                                <v-btn
                                                    :icon="mdiClose"
                                                    color="error"
                                                    variant="tonal"
                                                />
                                            </v-col>
                                        </v-row>
                                        <v-row
                                            class="mr-10"
                                            no-gutters
                                        >
                                            <v-col>Бел</v-col>
                                            <v-col>Жир</v-col>
                                            <v-col class="mr-4">Угл</v-col>
                                            <v-col>Калл</v-col>
                                        </v-row>
                                    </div>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
                <v-card class="w-75 h-100 pa-0 my-0 mx-auto rounded-lg mb-6">
                    <v-card-title class="pa-0">
                        <v-btn
                            class="w-100 d-flex justify-space-between text-h4 py-8 px-6"
                            :prepend-icon="mdiWeatherSunny"
                            :append-icon="mdiPlusCircleOutline"
                            @click="bb++"
                        >
                            {{ bb }}
                        </v-btn>
                    </v-card-title>
                    <v-card-text
                        v-if="bb"
                        class="pa-0 mt-0"
                    >
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-title class="px-6">
                                    <v-row
                                        class="mr-5"
                                        no-gutters
                                    >
                                        <v-col>Бел</v-col>
                                        <v-col>Жир</v-col>
                                        <v-col class="mr-4">Угл</v-col>
                                        <v-col>Калл</v-col>
                                    </v-row>
                                </v-expansion-panel-title>
                                <v-expansion-panel-text class="mt-2">
                                    <div class="mb-6 rounded-lg">
                                        <v-row
                                            class="gc-16 mb-4 align-center justify-space-between"
                                            no-gutters
                                        >
                                            <v-col class="text-h5 border-lg"> Творог</v-col>
                                            <v-col cols="auto">
                                                <v-text-field
                                                    width="100px"
                                                    variant="outlined"
                                                    hideDetails="auto"
                                                    density="compact"
                                                    autocomplete="off"
                                                    suffix="г."
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="auto">
                                                <v-btn
                                                    :icon="mdiClose"
                                                    color="error"
                                                    variant="tonal"
                                                />
                                            </v-col>
                                        </v-row>
                                        <v-row
                                            class="mr-10"
                                            no-gutters
                                        >
                                            <v-col>Бел</v-col>
                                            <v-col>Жир</v-col>
                                            <v-col class="mr-4">Угл</v-col>
                                            <v-col>Калл</v-col>
                                        </v-row>
                                    </div>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
                <v-card class="w-75 h-100 pa-0 my-0 mx-auto rounded-lg mb-6">
                    <v-card-title class="pa-0">
                        <v-btn
                            class="w-100 d-flex justify-space-between text-h4 py-8 px-6"
                            :prepend-icon="mdiWeatherSunsetDown"
                            :append-icon="mdiPlusCircleOutline"
                            @click="bb++"
                        >
                            {{ bb }}
                        </v-btn>
                    </v-card-title>
                    <v-card-text
                        v-if="bb"
                        class="pa-0 mt-0"
                    >
                        <v-expansion-panels>
                            <v-expansion-panel>
                                <v-expansion-panel-title class="px-6">
                                    <v-row
                                        class="mr-5"
                                        no-gutters
                                    >
                                        <v-col>Бел</v-col>
                                        <v-col>Жир</v-col>
                                        <v-col class="mr-4">Угл</v-col>
                                        <v-col>Калл</v-col>
                                    </v-row>
                                </v-expansion-panel-title>
                                <v-expansion-panel-text class="mt-2">
                                    <div class="mb-6 rounded-lg">
                                        <v-row
                                            class="gc-16 mb-4 align-center justify-space-between"
                                            no-gutters
                                        >
                                            <v-col class="text-h5 border-lg"> Творог</v-col>
                                            <v-col cols="auto">
                                                <v-text-field
                                                    width="100px"
                                                    variant="outlined"
                                                    hideDetails="auto"
                                                    density="compact"
                                                    autocomplete="off"
                                                    suffix="г."
                                                >
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="auto">
                                                <v-btn
                                                    :icon="mdiClose"
                                                    color="error"
                                                    variant="tonal"
                                                />
                                            </v-col>
                                        </v-row>
                                        <v-row
                                            class="mr-10"
                                            no-gutters
                                        >
                                            <v-col>Бел</v-col>
                                            <v-col>Жир</v-col>
                                            <v-col class="mr-4">Угл</v-col>
                                            <v-col>Калл</v-col>
                                        </v-row>
                                    </div>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                </v-card>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-sheet>
</template>

<style scoped></style>

<!--width="600"-->
<!--color="green"-->
<!--v-model="dateSelected"-->
<!--:allowed-dates="allowedDates"-->
<!--max="2018-03-20"-->
<!--min="2016-06-15"-->
<!--show-adjacent-months-->
