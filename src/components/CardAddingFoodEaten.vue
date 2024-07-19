<script setup>
import {
    mdiArrowLeftBoldCircleOutline,
    mdiArrowRightBoldCircleOutline,
    mdiBedEmpty,
    mdiCheckboxBlankCircleOutline,
    mdiPencil,
    mdiPlusCircleOutline,
    mdiTagHeartOutline,
    mdiCheckboxMarkedCircleOutline,
} from '@mdi/js';
import { ref, computed, onMounted } from 'vue';
import { useCalendarStore } from '../stores/Calendar.js';
import { useProductStore } from '../stores/Products.js';
import db from '../../db.json';

const calendarStore = useCalendarStore();
const productStore = useProductStore();

const props = defineProps({
    day: Object,
    title: String,
    type: String,
    icon: String,
});

const dialog = ref(false);
const page = ref(1);
const inputSearchProduct = ref('');
const headers = ref([
    {
        width: '65%',
        title: 'Продукты',
        align: 'start',
        key: 'name',
        cellProps: { class: 'title-table' },
    },
    {
        key: 'weight',
        nowrap: true,
        sortable: false,
    },
    {
        key: 'actions',
        nowrap: true,
        sortable: false,
    },
]);

const items = ref([]);
const listProducts = ref([]);

const switchDialog = () => (dialog.value = !dialog.value);
const adding = () => {
    calendarStore.addToMealList(props.day, props.type, listProducts.value);
    switchDialog();
    listProducts.value.length = 0;
    inputSearchProduct.value = '';
    initialize();
};

const initialize = () => {
    const actualInfo = [...productStore.products];
    actualInfo.map((item) => (item.weight = '100'));
    items.value = actualInfo;
};

const checkValidNumValues = (value) => {
    return /^([1-9][0-9]{0,3}(\.[0-9]{0,2})?|0\.[0-9]{0,2})$/.test(value);
};

const checkValidData = computed(() => {
    return listProducts.value.length > 0 && listProducts.value.every((item) => checkValidNumValues(item?.weight));
});

const onPageChange = (isAdd) => {
    if (isAdd) page.value += 1;
    else if (page.value > 1) page.value -= 1;
};

onMounted(() => {
    initialize();
});
</script>

<template>
    <v-btn
        class="w-100 d-flex justify-space-between text-h6 text-sm-h5 font-weight-bold pa-8"
        :prepend-icon="icon"
        :append-icon="mdiPlusCircleOutline"
        :text="title"
        @click="switchDialog"
    />
    <v-dialog
        class="elevation-16"
        scrim="primary"
        width="800"
        v-model="dialog"
    >
        <v-card class="text-primary pa-4 ma-0">
            <v-card-title class="mb-4 mx-auto text-center w-75 text-h5">
                {{ title }}
            </v-card-title>
            <v-card-text class="pa-0 mb-4">
                <v-data-table
                    class="text-primary scroll-container text-body-1 w-100 overflow-x-hidden text-break"
                    height="400px"
                    sticky
                    :search="inputSearchProduct"
                    :headers="headers"
                    :items="items"
                    v-model:page="page"
                    :items-per-page="15"
                    @update:page="onPageChange"
                >
                    <template #top>
                        <v-text-field
                            class="mb-2 pt-2"
                            clearable
                            autocomplete="off"
                            label="Поиск"
                            v-model="inputSearchProduct"
                        />
                    </template>
                    <template #[`item.name`]="{ item }">
                        <div class="mr-8">
                            <p class="text-subtitle-2 mb-1">
                                {{ item.name }}
                            </p>
                            <v-icon
                                v-if="item.id > db.length - 1"
                                class="mr-2"
                                size="25"
                                :icon="mdiTagHeartOutline"
                            />
                            <small class="text-caption text-medium-emphasis">{{ item.calories }} ккал</small>
                        </div>
                    </template>
                    <template #[`item.weight`]="{ item }">
                        <div class="d-flex justify-space-between align-center">
                            <v-text-field
                                class="text-subtitle-1"
                                variant="underlined"
                                base-color="transparent"
                                bg-color="transparent"
                                width="60px"
                                suffix="г"
                                maxlength="6"
                                autocomplete="off"
                                v-model="item.weight"
                                :rules="[checkValidNumValues]"
                            >
                                <template #prepend-inner>
                                    <v-icon
                                        class="mr-2"
                                        color="primary opacity-100"
                                        size="20"
                                        :icon="mdiPencil"
                                    />
                                </template>
                            </v-text-field>
                        </div>
                    </template>
                    <template #[`item.actions`]="{ item }">
                        <v-checkbox
                            density="compact"
                            hide-details
                            :value="item"
                            :false-icon="mdiCheckboxBlankCircleOutline"
                            :true-icon="mdiCheckboxMarkedCircleOutline"
                            v-model="listProducts"
                        />
                    </template>
                    <template #bottom>
                        <v-row
                            class="mt-4 pa-0 justify-space-between align-center"
                            no-gutters
                        >
                            <v-col>
                                <v-btn
                                    class="text-surface bg-primary text-subtitle-2"
                                    text="Отмена"
                                    variant="outlined"
                                    @click="switchDialog"
                                />
                            </v-col>
                            <v-col class="text-center d-flex align-center justify-center">
                                <v-btn
                                    variant="text"
                                    :icon="mdiArrowLeftBoldCircleOutline"
                                    @click="onPageChange(false)"
                                />
                                <span class="text-subtitle-2 mx-2">{{ page }}</span>
                                <v-btn
                                    variant="text"
                                    :icon="mdiArrowRightBoldCircleOutline"
                                    @click="onPageChange(true)"
                                />
                            </v-col>
                            <v-col class="d-flex justify-end">
                                <v-btn
                                    class="text-surface bg-primary text-subtitle-2"
                                    variant="outlined"
                                    text="Добавить"
                                    :disabled="!checkValidData"
                                    @click="adding"
                                />
                            </v-col>
                        </v-row>
                    </template>
                    <template #no-data>
                        <v-card elevation="0">
                            <v-card-title>
                                <v-icon>
                                    {{ mdiBedEmpty }}
                                </v-icon>
                            </v-card-title>
                            <v-card-text>Пусто</v-card-text>
                        </v-card>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
