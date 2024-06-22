import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useCalendarStore = defineStore('calendarStore', () => {
    const calendar = ref([
        {
            date: '2024-06-19',
            breakfast: [
                {
                    id: 1,
                    name: 'Творог',
                    weight: 90,
                    calories: 42,
                    proteins: 2,
                    fats: 5,
                    carbs: 12,
                },
                {
                    id: 2,
                    name: 'Йогурт',
                    weight: 100,
                    calories: 10,
                    proteins: 10,
                    fats: 5,
                    carbs: 2,
                },
            ],
            lunch: [],
            dinner: [],
        },
    ]);

    const calendarLS = localStorage.getItem('calendar');
    if (calendarLS) calendar.value = JSON.parse(calendarLS)._value;

    const formatCurrentDate = (currentDate) => {
        const dtYear = currentDate.getFullYear();
        const dtMonth =
            currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`;
        const dtDay = currentDate.getDate() >= 10 ? currentDate.getDate() : `0${currentDate.getDate()}`;
        return `${dtYear}-${dtMonth}-${dtDay}`;
    };

    const addMeal = (day, meal, listFoods) => {
        const currentDate = formatCurrentDate(day);
        if (calendar.value.find((item) => item.date === currentDate)) {
            const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
            listFoods.forEach((food) => {
                calendar.value[dayIndex][meal].push(food);
            });
        } else {
            const item = {
                date: currentDate,
                breakfast: [],
                lunch: [],
                dinner: [],
            };
            calendar.value.push({
                ...item,
                [meal]: [...listFoods],
            });
        }
    };

    const getMeal = computed(() => (day, meal) => {
        const currentDate = formatCurrentDate(day);
        if (calendar.value.find((item) => item.date === currentDate)) {
            const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
            return calendar.value[dayIndex][meal];
        } else return [];
    });

    const summaryMeal = computed(() => (day, meal) => {
        const currentDate = formatCurrentDate(day);
        const defaultSummary = {
            calories: 0,
            proteins: 0,
            fats: 0,
            carbs: 0,
        };
        if (calendar.value.find((item) => item.date === currentDate)) {
            const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
            const items = calendar.value[dayIndex][meal];
            return items.reduce((acc, curItem) => {
                acc.calories += curItem.calories;
                acc.proteins += curItem.proteins;
                acc.fats += curItem.fats;
                acc.carbs += curItem.carbs;
                return acc;
            }, defaultSummary);
        } else return defaultSummary;
    });

    const removeMeal = (day, meal, id) => {
        const currentDate = formatCurrentDate(day);
        const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
        calendar.value[dayIndex][meal] = calendar.value[dayIndex][meal].filter((item) => item.id !== id);
    };

    watch(
        () => calendar,
        (state) => localStorage.setItem('calendar', JSON.stringify(state)),
        { deep: true },
    );

    return {
        calendar,
        formatCurrentDate,
        addMeal,
        getMeal,
        summaryMeal,
        removeMeal,
    };
});
