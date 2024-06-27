import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { startOfWeek, startOfMonth, getYear, format } from 'date-fns';
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

    const addToMealList = (day, meal, listFoods) => {
        const currentDate = format(day, 'yyyy-MM-dd');
        const defaultItem = {
            date: currentDate,
            breakfast: [],
            lunch: [],
            dinner: [],
        };
        if (calendar.value.findIndex((item) => item.date === currentDate) === -1)
            calendar.value.push({ ...defaultItem });
        const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
        [...listFoods].forEach((food) =>
            calendar.value[dayIndex][meal].push({
                ...food,
                id: `${food.id}-${Date.now()}`,
            }),
        );
    };
    const removeMeal = (day, meal, id) => {
        const currentDate = format(day, 'yyyy-MM-dd');
        const dayIndex = calendar.value.findIndex((item) => item.date === currentDate);
        calendar.value[dayIndex][meal] = calendar.value[dayIndex][meal].filter((item) => item.id !== id);
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
                    proteins: res.proteins % 1 ? res.proteins.toFixed(2) : res.proteins,
                    fats: res.fats % 1 ? res.fats.toFixed(2) : res.fats,
                    carbs: res.carbs % 1 ? res.carbs.toFixed(2) : res.carbs,
                    calories: res.calories % 1 ? res.calories.toFixed(2) : res.calories,
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
                proteins: res.proteins % 1 ? res.proteins.toFixed(2) : res.proteins,
                fats: res.fats % 1 ? res.fats.toFixed(2) : res.fats,
                carbs: res.carbs % 1 ? res.carbs.toFixed(2) : res.carbs,
                calories: res.calories % 1 ? res.calories.toFixed(2) : res.calories,
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
                proteins:
                    (res.proteins / listDates.length) % 1
                        ? (res.proteins / listDates.length).toFixed(2)
                        : res.proteins / listDates.length,
                fats:
                    (res.fats / listDates.length) % 1
                        ? (res.fats / listDates.length).toFixed(2)
                        : res.fats / listDates.length,
                carbs:
                    (res.carbs / listDates.length) % 1
                        ? (res.carbs / listDates.length).toFixed(2)
                        : res.carbs / listDates.length,
                calories:
                    (res.calories / listDates.length) % 1
                        ? (res.calories / listDates.length).toFixed(2)
                        : res.calories / listDates.length,
            };
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
            console.log(monthName);
            const monthKey = `${monthName} - ${year}`;
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
