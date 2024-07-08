<script setup>
import { mdiPencil } from '@mdi/js';
import { computed, reactive, ref } from 'vue';
import { usePersonStore } from '../stores/Person.js';

const personStore = usePersonStore();

const dialog = ref(false);
const item = reactive({
    sex: personStore.person.sex,
    age: personStore.person.age,
    weight: personStore.person.weight,
    height: personStore.person.height,
    activity: personStore.person.activity,
});

const switchDialog = () => (dialog.value = !dialog.value);

const checkValidIntNumValues = (value) => {
    return /^([1-9][0-9]{0,3})$/.test(value);
};
const checkValidIntFloatValues = (value) => {
    return /^([1-9][0-9]?(\.[0-9]{1,2})?)$/.test(value);
};
const checkValidData = computed(() => {
    return (
        checkValidIntNumValues(item.age) && checkValidIntNumValues(item.height) && checkValidIntFloatValues(item.weight)
    );
});
const listSelectActivity = [
    {
        title: 'Минимальный',
        props: {
            subtitle: 'Сидячая работа, не требующая значительных физических нагрузок',
        },
    },
    {
        title: 'Низкий',
        props: {
            subtitle: 'Интенсивные упражнения не менее 20 минут 1-3 раза в неделю',
        },
    },
    {
        title: 'Умеренный',
        props: {
            subtitle: 'Интенсивная тренировка не менее 30-60 мин 3-4 раза в неделю',
        },
    },
    {
        title: 'Высокий',
        props: {
            subtitle: 'Интенсивные тренировки 5-7 дней в неделю',
        },
    },
    {
        title: 'Экстремальный ',
        props: {
            subtitle: 'С почти ежедневным графиком и несколькими тренировками в течение дня',
        },
    },
];

const editProduct = () => {
    switchDialog();
    personStore.updatePerson(item);
};
</script>

<template>
    <v-btn @click="switchDialog">
        <v-icon :icon="mdiPencil" />
    </v-btn>
    <v-dialog
        class="elevation-16 mx-auto"
        scrim="primary"
        width="600"
        v-model="dialog"
    >
        <v-card class="text-primary pa-4">
            <v-card-title class="text-center mb-6 pa-0 text-h5"> Личная информация</v-card-title>
            <v-card-text class="pa-0 mb-2">
                <v-row
                    class="mb-2"
                    dense
                >
                    <v-col>
                        <v-select
                            color="primary"
                            base-color="primary"
                            variant="outlined"
                            density="compact"
                            autocomplete="off"
                            hide-details
                            label="Пол"
                            :items="['Жен', 'Муж']"
                            v-model="item.sex"
                        >
                            <template v-slot:item="{ props, item }">
                                <v-list-item
                                    class="text-primary"
                                    v-bind="props"
                                ></v-list-item>
                            </template>
                        </v-select>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="item.age"
                            :maxlength="2"
                            base-color="primary"
                            autocomplete="off"
                            label="Возвраст"
                            :rules="[checkValidIntNumValues]"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="item.height"
                            :maxlength="3"
                            base-color="primary"
                            autocomplete="off"
                            label="Рост"
                            suffix="см"
                            :rules="[checkValidIntNumValues]"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="item.weight"
                            :maxlength="5"
                            base-color="primary"
                            autocomplete="off"
                            label="Вес"
                            suffix="кг"
                            :rules="[checkValidIntFloatValues]"
                        />
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col>
                        <v-select
                            color="primary"
                            base-color="primary"
                            variant="outlined"
                            density="compact"
                            autocomplete="off"
                            hide-details
                            label="Уровень активности"
                            :items="listSelectActivity"
                            v-model="item.activity"
                        >
                            <template v-slot:item="{ props, item }">
                                <v-list-item
                                    class="text-primary"
                                    v-bind="props"
                                ></v-list-item>
                            </template>
                        </v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="pa-0">
                <v-row justify="space-between">
                    <v-col cols="auto">
                        <v-btn
                            class="text-surface bg-primary"
                            variant="outlined"
                            text="Отмена"
                            @click="switchDialog"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            class="text-surface bg-primary"
                            text="Редактировать"
                            :disabled="!checkValidData"
                            @click="editProduct"
                        />
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
