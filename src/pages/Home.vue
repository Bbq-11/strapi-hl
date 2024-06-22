<script setup>
import { ref } from 'vue';
import SectionMeals from '../components/SectionMeals.vue';
import { mdiWeatherSunny, mdiWeatherSunsetDown, mdiWeatherSunsetUp } from '@mdi/js';

const formatCurrentDate = (currentDate) => {
    const dtYear = currentDate.getFullYear();
    const dtMonth = currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`;
    const dtDay = currentDate.getDate() >= 10 ? currentDate.getDate() : `0${currentDate.getDate()}`;
    return `${dtYear}-${dtMonth}-${dtDay}`;
};

const formatDate = new Date();
const dateSelected = ref(formatDate);

const weekdays = [
    {
        title: 'Завтрак',
        field: 'breakfast',
        icon: mdiWeatherSunsetUp,
    },
    {
        title: 'Обед',
        field: 'lunch',
        icon: mdiWeatherSunny,
    },
    {
        title: 'Ужин',
        field: 'dinner',
        icon: mdiWeatherSunsetDown,
    },
];
</script>

<template>
    <v-date-picker
        class="mx-auto"
        v-model="dateSelected"
        :max="formatDate"
        :min="(formatDate.getFullYear() - 2).toString()"
    />
    <SectionMeals
        v-for="weekday in weekdays"
        :day="dateSelected"
        :title="weekday.title"
        :type="weekday.field"
        :icon="weekday.icon"
    />
    <!--    <SectionMeals-->
    <!--        :day="dateSelected"-->
    <!--        type="Обед"-->
    <!--        :bb="mdiWeatherSunny"-->
    <!--    />-->
    <!--    <SectionMeals-->
    <!--        :day="dateSelected"-->
    <!--        type="Ужин"-->
    <!--        :bb="mdiWeatherSunsetDown"-->
    <!--    />-->
</template>

<style scoped></style>
