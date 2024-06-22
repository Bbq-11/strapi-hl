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
                    proteins: 2,
                    fats: 5,
                    carbs: 12,
                    calories: 42,
                },
                {
                    id: 2,
                    name: 'Йогурт',
                    weight: 100,
                    proteins: 10,
                    fats: 5,
                    carbs: 2,
                    calories: 10,
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

    const summaryMeal = (day, meal) =>
        computed(() => {
            const currentDate = formatCurrentDate(day);
            const defaultSummary = {
                proteins: 0,
                fats: 0,
                carbs: 0,
                calories: 0,
            };
            if (calendar.value.find((item) => item.date === currentDate)) {
                const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
                const items = calendar.value[dayIndex][meal];
                const res = items.reduce((acc, curItem) => {
                    acc.calories += curItem.calories * (curItem.weight / 100);
                    acc.proteins += curItem.proteins * (curItem.weight / 100);
                    acc.fats += curItem.fats * (curItem.weight / 100);
                    acc.carbs += curItem.carbs * (curItem.weight / 100);
                    return acc;
                }, defaultSummary);
                return {
                    proteins: res.proteins.toFixed(2),
                    fats: res.fats.toFixed(2),
                    carbs: res.carbs.toFixed(2),
                    calories: res.calories.toFixed(2),
                };
            } else return defaultSummary;
        });

    const summaryAllMeal = (day) =>
        computed(() => {
            const listMeal = [
                summaryMeal(day, 'breakfast').value,
                summaryMeal(day, 'lunch').value,
                summaryMeal(day, 'dinner').value,
            ];
            const defaultSummary = {
                proteins: 0,
                fats: 0,
                carbs: 0,
                calories: 0,
            };
            const res = listMeal.reduce((acc, curItem) => {
                acc.calories += +curItem.calories;
                acc.proteins += +curItem.proteins;
                acc.fats += +curItem.fats;
                acc.carbs += +curItem.carbs;
                return acc;
            }, defaultSummary);

            return {
                proteins: res.proteins.toFixed(2),
                fats: res.fats.toFixed(2),
                carbs: res.carbs.toFixed(2),
                calories: res.calories.toFixed(2),
            };
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
        summaryAllMeal,
    };
});
