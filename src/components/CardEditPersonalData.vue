<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { mdiCheck, mdiClose, mdiPencil } from '@mdi/js';
import { usePersonStore } from '../stores/Person.js';
import { useDisplay } from 'vuetify';

const personStore = usePersonStore();
const { mobile, name } = useDisplay();

const isMobile = ref(mobile.value);
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

const checkValidIntNumValues = (value) => /^([1-9][0-9]{0,2})$/.test(value);
const checkValidIntFloatValues = (value) => /^(([1-9][0-9]{0,2})?(\.[0-9]{1,2})?)$/.test(value);
const checkValidData = computed(
    () =>
        checkValidIntNumValues(item.age) &&
        checkValidIntNumValues(item.height) &&
        checkValidIntFloatValues(item.weight),
);
const adaptiveWidth = computed(() => {
    switch (name.value) {
        case 'sm':
            return 300;
        default:
            return 600;
    }
});

watch(
    () => mobile.value,
    () => {
        isMobile.value = mobile.value;
    },
);
</script>

<template>
    <v-btn
        class="rounded-lg"
        block
        width="80"
        @click="switchDialog"
    >
        <v-icon :icon="mdiPencil" />
    </v-btn>
    <v-dialog
        v-model="dialog"
        :width="adaptiveWidth"
    >
        <v-card class="text-primary pa-2 pa-sm-4">
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
                                    v-model="item.sex"
                                    color="primary"
                                    base-color="primary"
                                    variant="outlined"
                                    density="compact"
                                    autocomplete="off"
                                    hide-details
                                    label="Пол"
                                    :items="['Жен', 'Муж']"
                                >
                                    <template #item="{ props }">
                                        <v-list-item
                                            class="text-primary"
                                            v-bind="props"
                                        />
                                    </template>
                                </v-select>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="item.age"
                                    autocomplete="off"
                                    label="Возраст"
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
                                    v-model="item.height"
                                    autocomplete="off"
                                    label="Рост"
                                    suffix="см"
                                    :maxlength="3"
                                    :rules="[checkValidIntNumValues]"
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="item.weight"
                                    autocomplete="off"
                                    label="Вес"
                                    suffix="кг"
                                    :maxlength="6"
                                    :rules="[checkValidIntFloatValues]"
                                />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col>
                        <v-select
                            v-model="item.activity"
                            color="primary"
                            base-color="primary"
                            variant="outlined"
                            density="compact"
                            autocomplete="off"
                            hide-details
                            label="Уровень активности"
                            :items="listSelectActivity"
                        >
                            <template #item="{ props }">
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
                <v-row
                    justify="space-between"
                    no-gutters
                >
                    <v-col cols="auto">
                        <VBtnCard
                            :size="isMobile ? 40 : 'default'"
                            :icon="isMobile ? mdiClose : false"
                            :text="isMobile ? '' : 'Отмена'"
                            @click="switchDialog"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <VBtnCard
                            :size="isMobile ? 40 : 'default'"
                            :icon="isMobile ? mdiCheck : false"
                            :text="isMobile ? '' : 'Редактировать'"
                            :disabled="!checkValidData"
                            @click="editProduct"
                        />
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
