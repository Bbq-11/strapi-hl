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
    const defaultItem = {
        proteins: 0,
        fats: 0,
        carbs: 0,
        calories: 0,
    };

    const calendarLS = localStorage.getItem('calendar');
    if (calendarLS) calendar.value = JSON.parse(calendarLS)._value;

    const formatCurrentDate = (currentDate) => {
        const dtYear = currentDate.getFullYear();
        const dtMonth =
            currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`;
        const dtDay = currentDate.getDate() >= 10 ? currentDate.getDate() : `0${currentDate.getDate()}`;
        return `${dtYear}-${dtMonth}-${dtDay}`;
    };

    const addToMealList = (day, meal, listFoods) => {
        const currentDate = formatCurrentDate(day);
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

    const getListOneMeal = (day, meal) =>
        computed(() => {
            const currentDate = formatCurrentDate(day);
            if (calendar.value.find((item) => item.date === currentDate)) {
                const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
                return calendar.value[dayIndex][meal];
            } else return [];
        });

    const getInfoOneMeal = (day, meal) =>
        computed(() => {
            const currentItem = getListOneMeal(day, meal).value;
            if (currentItem.length) {
                const res = currentItem.reduce((acc, curItem) => {
                    acc.calories += curItem.calories * (curItem.weight / 100);
                    acc.proteins += curItem.proteins * (curItem.weight / 100);
                    acc.fats += curItem.fats * (curItem.weight / 100);
                    acc.carbs += curItem.carbs * (curItem.weight / 100);
                    return acc;
                }, defaultItem);
                return {
                    proteins: res.proteins.toFixed(2),
                    fats: res.fats.toFixed(2),
                    carbs: res.carbs.toFixed(2),
                    calories: res.calories.toFixed(2),
                };
            } else return defaultItem;
        });

    const getInfoAllMeal = (day) =>
        computed(() => {
            const currentItem = [
                getInfoOneMeal(day, 'breakfast').value,
                getInfoOneMeal(day, 'lunch').value,
                getInfoOneMeal(day, 'dinner').value,
            ];
            const res = currentItem.reduce((acc, curItem) => {
                acc.calories += +curItem.calories;
                acc.proteins += +curItem.proteins;
                acc.fats += +curItem.fats;
                acc.carbs += +curItem.carbs;
                return acc;
            }, defaultItem);
            return {
                proteins: res.proteins.toFixed(2),
                fats: res.fats.toFixed(2),
                carbs: res.carbs.toFixed(2),
                calories: res.calories.toFixed(2),
            };
        });

    const getInfoAllMealInGapDays = (listDates) =>
        computed(() => {
            if ([...listDates.value].length === 1) return getInfoAllMeal([...listDates.value][0]).value;
            return [...listDates.value].reduce((acc, curItem) => {
                const currentItem = getInfoAllMeal(curItem).value;
                acc.calories += +currentItem.calories;
                acc.proteins += +currentItem.proteins;
                acc.fats += +currentItem.fats;
                acc.carbs += +currentItem.carbs;
                return acc;
            }, defaultItem);
        });

    const removeMeal = (day, meal, id) => {
        const currentDate = formatCurrentDate(day);
        const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
        calendar.value[dayIndex][meal] = calendar.value[dayIndex][meal].filter((item) => item.id !== id);
    };

    const getListActualDays = (listDates) =>
        computed(() => {
            if ([...listDates].length === 1)
                return { date: formatCurrentDate(listDates[0]), ...getInfoAllMeal(listDates[0]).value };
            const currentItem = [];
            [...listDates].forEach((item) => {
                currentItem.push({
                    date: formatCurrentDate(item),
                    ...getInfoAllMeal(item).value,
                });
            });
            return currentItem;
        });

    watch(
        () => calendar,
        (state) => localStorage.setItem('calendar', JSON.stringify(state)),
        { deep: true },
    );

    return {
        calendar,
        formatCurrentDate,
        addToMealList,
        getListOneMeal,
        getInfoOneMeal,
        removeMeal,
        getInfoAllMeal,
        getInfoAllMealInGapDays,
        getListActualDays,
    };
});
