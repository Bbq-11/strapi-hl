import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import db from '../../db';
import { fa } from 'vuetify/locale';

export const usePersonStore = defineStore('personStore', () => {
    const person = ref({
        sex: null,
        age: null,
        weight: null,
        height: null,
        activity: null,
        isActive: false,
    });

    const listActivity = new Map([
        ['Минимальный', 1.2],
        ['Низкий', 1.375],
        ['Умеренный', 1.55],
        ['Высокий', 1.7],
        ['Экстремальный', 1.9],
    ]);

    const personLS = localStorage.getItem('person');
    if (personLS) person.value = JSON.parse(personLS)._value;

    const updatePerson = (item) => {
        for (let key in item) person.value[key] = item[key];
        person.value.isActive = true;
    };

    const getSumFormula = () => 10 * person.value.weight + 6.25 * person.value.height - 5 * person.value.age;
    const getStandard = computed(() => {
        return person.value.sex === 'Муж'
            ? listActivity.get(person.value.activity) * (getSumFormula() + 5)
            : listActivity.get(person.value.activity) * (getSumFormula() - 161);
    });

    watch(
        () => person,
        (state) => localStorage.setItem('person', JSON.stringify(state)),
        { deep: true },
    );

    return {
        person,
        updatePerson,
        getStandard,
    };
});
