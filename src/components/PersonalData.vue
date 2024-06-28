<script setup>
import CardEditPersonalData from './CardEditPersonalData.vue';
import { usePersonStore } from '../stores/Person.js';
import { computed } from 'vue';

const personStore = usePersonStore();

const getAgeString = computed(() => {
    if (!personStore.person.age) return null;
    if (personStore.person.age % 10 === 1 && personStore.person.age % 100 !== 11)
        return `${personStore.person.age} год`;
    else if (
        personStore.person.age % 10 >= 2 &&
        personStore.person.age % 10 <= 4 &&
        (personStore.person.age % 100 < 10 || personStore.person.age % 100 >= 20)
    )
        return `${personStore.person.age} года`;
    return `${personStore.person.age} лет`;
});
</script>

<template>
    <v-card class="mx-auto mb-8 text-primary">
        <v-card-text>
            <v-row class="text-center align-center text-subtitle-2">
                <v-col> {{ personStore.person.sex || 'Пол' }}</v-col>
                <v-col> {{ getAgeString || 'Возвраст' }}</v-col>
                <v-col> {{ personStore.person.height || 'Рост' }} (см)</v-col>
                <v-col> {{ personStore.person.weight || 'Вес' }} (кг)</v-col>
                <v-spacer />
                <v-col cols="2">
                    {{ personStore.person.activity || '-' }} <br />
                    <small class="text-primary text-body-2">уровень активности</small>
                </v-col>
                <v-spacer />
                <v-col cols="auto">
                    <CardEditPersonalData />
                </v-col>
            </v-row>
            <!--            {{ personStore.getStandard }}-->
        </v-card-text>
    </v-card>
</template>

<style scoped></style>
