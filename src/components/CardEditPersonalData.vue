<script setup>
import { computed, reactive, ref } from 'vue';
import { mdiPencil } from '@mdi/js';
import { usePersonStore } from '../stores/Person.js';
import { useDisplay } from 'vuetify';

const personStore = usePersonStore();

const dialog = ref(false);
const item = reactive({
    sex: personStore.person.sex,
    age: personStore.person.age,
    weight: personStore.person.weight,
    height: personStore.person.height,
    activity: personStore.person.activity,
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
        title: 'Экстремальный',
        props: {
            subtitle: 'С почти ежедневным графиком и несколькими тренировками в течение дня',
        },
    },
];

const switchDialog = () => (dialog.value = !dialog.value);
const editProduct = () => {
    switchDialog();
    personStore.updatePerson(item);
};

const checkValidIntNumValues = (value) => /^([1-9][0-9]{0,3})$/.test(value);
const checkValidIntFloatValues = (value) => /^([1-9][0-9]?(\.[0-9]{1,2})?)$/.test(value);
const checkValidData = computed(
    () =>
        checkValidIntNumValues(item.age) &&
        checkValidIntNumValues(item.height) &&
        checkValidIntFloatValues(item.weight),
);
const { name } = useDisplay();

const height = computed(() => {
    switch (name.value) {
        case 'sm':
            return 300;
        default:
            return 600;
    }
});
</script>

<template>
    <v-btn
        width="80"
        block
        @click="switchDialog"
    >
        <v-icon :icon="mdiPencil" />
    </v-btn>
    <v-dialog
        class="elevation-16 mx-auto"
        scrim="primary"
        :width="height"
        v-model="dialog"
    >
        <v-card class="text-primary pa-4">
            <v-card-title class="text-center text-h6 text-sm-h5 font-weight-bold pa-0 mb-4 mb-sm-6">
                Личная информация
            </v-card-title>
            <v-card-text class="pa-0 mb-4 mb-sm-6">
                <v-row
                    class="mb-2 gc-6 gr-2"
                    no-gutters
                    dense
                >
                    <v-col
                        cols="12"
                        sm=""
                    >
                        <v-row
                            class="gc-6 justify-space-between mb-2"
                            no-gutters
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
                                        />
                                    </template>
                                </v-select>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    base-color="primary"
                                    autocomplete="off"
                                    label="Возвраст"
                                    v-model="item.age"
                                    :maxlength="2"
                                    :rules="[checkValidIntNumValues]"
                                />
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col
                        cols="12"
                        sm=""
                    >
                        <v-row
                            class="gc-6 mb-2"
                            no-gutters
                        >
                            <v-col>
                                <v-text-field
                                    base-color="primary"
                                    autocomplete="off"
                                    label="Рост"
                                    suffix="см"
                                    v-model="item.height"
                                    :maxlength="3"
                                    :rules="[checkValidIntNumValues]"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    base-color="primary"
                                    autocomplete="off"
                                    label="Вес"
                                    suffix="кг"
                                    v-model="item.weight"
                                    :maxlength="5"
                                    :rules="[checkValidIntFloatValues]"
                                />
                            </v-col>
                        </v-row>
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
                                />
                            </template>
                        </v-select>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="pa-0">
                <v-row justify="space-between">
                    <v-col cols="auto">
                        <v-btn
                            class="text-surface bg-primary text-caption text-sm-button text-uppercase"
                            text="Отмена"
                            @click="switchDialog"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            class="text-surface bg-primary text-caption text-sm-button text-uppercase"
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
