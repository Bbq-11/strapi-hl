import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useCalendarStore = defineStore('calendarStore', () => {
    const calendar = ref([
        {
            date: '2024-05-10',
            breakfast: [
                {
                    id: new Date(),
                    productName: 'Творог',
                    calories: 0,
                    proteins: 0,
                    fats: 0,
                    carbs: 0,
                },
            ],
            lunch: [],
            dinner: [],
        },
    ]);

    const formatCurrentDate = (currentDate) => {
        const dtYear = currentDate.getFullYear();
        const dtMonth = currentDate.getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : `0${new Date().getMonth() + 1}`;
        const dtDay = currentDate.getDate() >= 10 ? new Date().getDate() : `0${new Date().getDate()}`;
        return `${dtYear}-${dtMonth}-${dtDay}`;
    };

    const addProduct = (day, meal, product) => {
        const currentDate = formatCurrentDate(day);
        if (calendar.value.find((item) => item.date === currentDate)) {
        } else {
            calendar.value.push(day);
        }
    };

    return {
        calendar,
        formatCurrentDate,
    };
});
