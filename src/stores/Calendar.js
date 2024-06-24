import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { it } from 'vuetify/locale';

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
        console.log(listFoods.value);
        const defaultItem = {
            date: currentDate,
            breakfast: [],
            lunch: [],
            dinner: [],
        };
        if (calendar.value.find((item) => item.date === currentDate)) {
            const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
            listFoods.value.forEach((food) => calendar.value[dayIndex][meal].push(food));
        } else {
            calendar.value.push({
                ...defaultItem,
                [meal]: [...listFoods.value],
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

    const summaryAllMealAllDays = (listDates) =>
        computed(() => {
            if ([...listDates.value].length === 1) return summaryAllMeal([...listDates.value][0]).value;
            const defaultSummary = {
                proteins: 0,
                fats: 0,
                carbs: 0,
                calories: 0,
            };
            return [...listDates.value].reduce((acc, curItem) => {
                const infoItem = summaryAllMeal(curItem).value;
                acc.calories += +infoItem.calories;
                acc.proteins += +infoItem.proteins;
                acc.fats += +infoItem.fats;
                acc.carbs += +infoItem.carbs;
                return acc;
            }, defaultSummary);
            // const currentStartDate = formatCurrentDate(startDay);
            // const currentLastDate = formatCurrentDate(lastDay);
            // const dayIndex = calendar.value.findIndex((item) => item.date === currentStartDate);
        });

    const removeMeal = (day, meal, id) => {
        const currentDate = formatCurrentDate(day);
        const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
        calendar.value[dayIndex][meal] = calendar.value[dayIndex][meal].filter((item) => item.id !== id);
    };

    const getListActualDays = (listDates) =>
        computed(() => {
            if ([...listDates].length === 1)
                return { date: formatCurrentDate(listDates[0]), ...summaryAllMeal(listDates[0]).value };
            const res = [];
            [...listDates].forEach((item) => {
                res.push({
                    date: formatCurrentDate(item),
                    ...summaryAllMeal(item).value,
                });
            });
            return res;
        });

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
        summaryAllMealAllDays,
        getListActualDays,
    };
});
