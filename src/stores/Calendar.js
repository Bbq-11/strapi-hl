import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { eachWeekOfInterval, getYear } from 'date-fns';
import { startOfWeek, getWeek, startOfMonth, getMonth, format } from 'date-fns';

import { ru } from 'date-fns/locale';

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

    const groupByWeek = (listDates) => {
        return listDates.reduce((result, date) => {
            const weekStart = startOfWeek(date, { weekStartsOn: 1 });
            const weekNumber = getWeek(weekStart, { weekStartsOn: 1 });
            const weekKey = `${format(weekStart, 'dd-MM-yyyy')}`;

            if (!result[weekKey]) {
                result[weekKey] = [];
            }

            result[weekKey].push(format(date, 'yyyy-MM-dd')); // Форматируем дату в виде 'yyyy-MM-dd'
            return result;
        }, {});
    };
    const groupByMonth = (listDates) => {
        return listDates.reduce((result, date) => {
            const monthStart = startOfMonth(date); // Установите первый день недели на понедельник
            const monthNumber = getMonth(monthStart) + 1;
            const yearNumber = getYear(date);
            const monthName =
                format(monthStart, 'LLLLL', { locale: ru }) + format(monthStart, 'LLL', { locale: ru }).slice(1);
            console.log(monthName);
            const monthKey = `${monthName} - ${yearNumber}`;

            if (!result[monthKey]) {
                result[monthKey] = [];
            }

            result[monthKey].push(format(date, 'yyyy-MM-dd')); // Форматируем дату в виде 'yyyy-MM-dd'
            return result;
        }, {});
    };

    // const checkEmptyMeal = (day, meal) => computed(() => {
    //     calendar.value.find((item) => item.date === currentDate)
    // });

    const addToMealList = (day, meal, listFoods) => {
        console.log([...listFoods]);
        const currentDate = format(day, 'yyyy-MM-dd');
        const defaultItem = {
            date: currentDate,
            breakfast: [],
            lunch: [],
            dinner: [],
        };
        console.log(calendar.value.findIndex((item) => item.date === currentDate));
        if (calendar.value.findIndex((item) => item.date === currentDate) === -1) {
            console.log('2');
            calendar.value.push({
                ...defaultItem,
            });
        }
        const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
        console.log(calendar.value[1]);
        [...listFoods].forEach((food) => {
            console.log({ ...food, id: `${food.id}-${Date.now()}` });
            calendar.value[dayIndex][meal].push({ ...food, id: `${food.id}-${Date.now()}` });
        });
    };

    const getListOneMeal = (day, meal) =>
        computed(() => {
            const currentDate = format(day, 'yyyy-MM-dd');
            if (calendar.value.find((item) => item.date === currentDate)) {
                const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
                return calendar.value[dayIndex][meal];
            } else return [];
        });

    const getInfoOneMeal = (day, meal) =>
        computed(() => {
            const currentItem = getListOneMeal(day, meal).value;
            const defaultItem = {
                proteins: 0,
                fats: 0,
                carbs: 0,
                calories: 0,
            };
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
            const defaultItem = {
                proteins: 0,
                fats: 0,
                carbs: 0,
                calories: 0,
            };
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
            if ([...listDates].length === 1) return getInfoAllMeal([...listDates][0]).value;
            const defaultItem = {
                proteins: 0,
                fats: 0,
                carbs: 0,
                calories: 0,
            };
            const res = [...listDates].reduce((acc, curItem) => {
                const currentItem = getInfoAllMeal(curItem).value;
                acc.calories += +currentItem.calories;
                acc.proteins += +currentItem.proteins;
                acc.fats += +currentItem.fats;
                acc.carbs += +currentItem.carbs;
                return acc;
            }, defaultItem);
            return {
                calories: +(res.calories / listDates.length).toFixed(2),
                proteins: +(res.proteins / listDates.length).toFixed(2),
                fats: +(res.fats / listDates.length).toFixed(2),
                carbs: +(res.carbs / listDates.length).toFixed(2),
            };
        });

    const removeMeal = (day, meal, id) => {
        const currentDate = format(day, 'yyyy-MM-dd');
        const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
        calendar.value[dayIndex][meal] = calendar.value[dayIndex][meal].filter((item) => item.id !== id);
    };

    const getListActualDays = (listDates) =>
        computed(() => {
            if ([...listDates].length === 1)
                return { date: format(listDates[0], 'yyyy-MM-dd'), ...getInfoAllMeal(listDates[0]).value };
            const currentItem = [];
            [...listDates].forEach((item) => {
                currentItem.push({
                    date: format(item, 'd MMMM', { locale: ru }),
                    ...getInfoAllMeal(item).value,
                });
            });
            return currentItem;
        });

    const getInfoForWeek = (listDates) =>
        computed(() => {
            const listOfWeeks = groupByWeek(listDates);
            const res = [];
            for (let key in listOfWeeks) {
                res.push({
                    date: key,
                    ...getInfoAllMealInGapDays(listOfWeeks[key]).value,
                    count: listOfWeeks[key].length,
                });
            }
            return res;
        });
    const getInfoForMonth = (listDates) =>
        computed(() => {
            const listOfMoths = groupByMonth(listDates);
            console.log(listOfMoths);
            const res = [];
            for (let key in listOfMoths) {
                res.push({
                    date: key,
                    ...getInfoAllMealInGapDays(listOfMoths[key]).value,
                    count: listOfMoths[key].length,
                });
            }
            return res;
        });
    watch(
        () => calendar,
        (state) => localStorage.setItem('calendar', JSON.stringify(state)),
        { deep: true },
    );

    return {
        calendar,
        addToMealList,
        getListOneMeal,
        getInfoOneMeal,
        removeMeal,
        getInfoAllMeal,
        getInfoAllMealInGapDays,
        getListActualDays,
        getInfoForWeek,
        getInfoForMonth,
    };
});
