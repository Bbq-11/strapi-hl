import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { startOfWeek, startOfMonth, getYear, format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const useCalendarStore = defineStore('calendarStore', () => {
    const calendar = ref([]);

    const calendarLS = localStorage.getItem('calendar');
    if (calendarLS) calendar.value = JSON.parse(calendarLS)._value;

    const listOfMeals = ['breakfast', 'lunch', 'dinner'];
    const defaultMeal = {
        proteins: 0,
        fats: 0,
        carbs: 0,
        calories: 0,
    };

    const formatFood = (food) => {
        const res = {};
        Object.keys(food).forEach((key) => {
            res[key] = food[key] % 1 ? food[key].toFixed(2) : food[key];
        });
        return res;
    };
    const formatSumFoods = (sum, numberDays) => {
        const res = {};
        Object.keys(sum).forEach((key) => {
            const averageCount = sum[key] / numberDays;
            res[key] = averageCount % 1 ? averageCount.toFixed(2) : averageCount;
        });
        return res;
    };

    const addToMealList = (day, meal, listFoods) => {
        const currentDate = format(day, 'yyyy-MM-dd');
        const item = {
            date: currentDate,
            breakfast: [],
            lunch: [],
            dinner: [],
        };
        const dayItem = calendar.value.find((item) => item?.date === currentDate);
        if (!dayItem) calendar.value.push({ ...item });
        [...listFoods].forEach((food) =>
            dayItem[meal].push({
                ...food,
                id: `${food.id}-${Date.now()}`,
            }),
        );
    };
    const removeMeal = (day, meal, id) => {
        const currentDate = format(day, 'yyyy-MM-dd');
        const dayItem = calendar.value.find((item) => item?.date === currentDate);
        dayItem[meal] = dayItem[meal].filter((item) => item.id !== id);
    };
    const getListOneMeal = (day, meal) =>
        computed(() => {
            const currentDate = format(day, 'yyyy-MM-dd');
            const listOneMeal = calendar.value.find((item) => item?.date === currentDate);
            return listOneMeal[meal] || [];
        });
    const getInfoOneMeal = (day, meal) =>
        computed(() => {
            const currentItem = getListOneMeal(day, meal).value;
            if (currentItem.length) {
                const res = currentItem.reduce(
                    (acc, curItem) => {
                        acc.calories += curItem.calories * (curItem.weight / 100);
                        acc.proteins += curItem.proteins * (curItem.weight / 100);
                        acc.fats += curItem.fats * (curItem.weight / 100);
                        acc.carbs += curItem.carbs * (curItem.weight / 100);
                        return acc;
                    },
                    { ...defaultMeal },
                );
                return formatFood(res);
            }
            return defaultMeal;
        });
    const getInfoAllMeal = (day) =>
        computed(() => {
            const currentItem = [];
            listOfMeals.forEach((meal) => currentItem.push(getInfoOneMeal(day, meal).value));
            const res = currentItem.reduce(
                (acc, curItem) => {
                    acc.calories += +curItem.calories;
                    acc.proteins += +curItem.proteins;
                    acc.fats += +curItem.fats;
                    acc.carbs += +curItem.carbs;
                    return acc;
                },
                { ...defaultMeal },
            );
            return formatFood(res);
        });
    const getInfoAllMealInGapDays = (listDates) =>
        computed(() => {
            if ([...listDates].length === 1) return getInfoAllMeal([...listDates][0]).value;
            const res = [...listDates].reduce(
                (acc, curItem) => {
                    const currentItem = getInfoAllMeal(curItem).value;
                    acc.calories += +currentItem.calories;
                    acc.proteins += +currentItem.proteins;
                    acc.fats += +currentItem.fats;
                    acc.carbs += +currentItem.carbs;
                    return acc;
                },
                { ...defaultMeal },
            );
            return formatSumFoods(res, listDates);
        });
    const getListActualDays = (listDates) =>
        computed(() => {
            if ([...listDates].length === 1)
                return { date: format(listDates[0], 'yyyy-MM-dd'), ...getInfoAllMeal(listDates[0]).value };
            const acc = [];
            [...listDates].forEach((item) => {
                acc.push({
                    date: format(item, 'd MMMM', { locale: ru }),
                    ...getInfoAllMeal(item).value,
                });
            });
            return acc;
        });

    const groupByWeek = (listDates) => {
        return listDates.reduce((acc, curDate) => {
            const weekStart = startOfWeek(curDate, { weekStartsOn: 1 });
            const weekKey = `${format(weekStart, 'dd-MM-yyyy')}`;
            if (!acc[weekKey]) acc[weekKey] = [];
            acc[weekKey].push(format(curDate, 'yyyy-MM-dd'));
            return acc;
        }, {});
    };
    const groupByMonth = (listDates) => {
        return listDates.reduce((acc, curDate) => {
            const monthStart = startOfMonth(curDate);
            const year = getYear(curDate);
            const monthName =
                format(monthStart, 'LLLLL', { locale: ru }) + format(monthStart, 'LLL', { locale: ru }).slice(1);
            const monthKey = `${monthName} ${year}`;
            if (!acc[monthKey]) acc[monthKey] = [];
            acc[monthKey].push(format(curDate, 'yyyy-MM-dd'));
            return acc;
        }, {});
    };

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
