<script setup>
import { ref } from 'vue';

const tab = ref('1');

const getCurrentDate = () => {
    const dtYear = new Date().getFullYear();
    const dtMonth = new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`;
    const dtDay = new Date().getDate() - 1 > 10 ? new Date().getDate() - 1 : `0${new Date().getDate() - 1}`;
    return `${dtYear}-${dtMonth}-${dtDay}`;
};
const dateSelected = ref(new Date(getCurrentDate()));
</script>

<template>
    <v-card class="app-container mx-auto rounded-xl mt-8">
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
                <v-container
                    class="d-flex flex-column mx-auto"
                    fluid
                >
                    {{ typeof getMinDate() }}
                    <v-row justify="center">
                        <v-date-picker
                            v-model="dateSelected"
                            :max="dateSelected"
                            :min="(dateSelected.getFullYear() - 1).toString()"
                        ></v-date-picker>
                    </v-row>
                </v-container>
            </v-tabs-window-item>
        </v-tabs-window>
    </v-card>
</template>

<style scoped></style>

<!--width="600"-->
<!--color="green"-->
<!--v-model="dateSelected"-->
<!--:allowed-dates="allowedDates"-->
<!--max="2018-03-20"-->
<!--min="2016-06-15"-->
<!--show-adjacent-months-->
