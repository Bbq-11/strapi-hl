<script setup>
import {
    mdiArrowLeftBoldCircleOutline,
    mdiArrowRightBoldCircleOutline,
    mdiBedEmpty,
    mdiCheckboxBlankCircleOutline,
    mdiHeart,
    mdiPencil,
    mdiPlusCircleOutline,
    mdiStar,
    mdiTagHeart,
    mdiTagHeartOutline,
    mdiWeatherSunsetUp,
} from '@mdi/js';
import { onBeforeMount, ref, onMounted, onUpdated, watch, computed } from 'vue';
import { useCalendarStore } from '../stores/Calendar.js';
import { useProductStore } from '../stores/Products.js';
import { mdiCheckboxMarkedCircleOutline } from '@mdi/js';
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
        title: 'Продукты',
        align: 'start',
        width: '85%',
        key: 'name',
    },
    {
        key: 'weight',
        sortable: false,
    },
    {
        key: 'actions',
        width: '15%',
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
    setTimeout(() => initialize(), 1000);
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

onBeforeMount(() => {
    initialize();
});

const onPageChange = (isAdd) => {
    if (isAdd) page.value += 1;
    else if (page.value > 1) page.value -= 1;
};
</script>

<template>
    <v-btn
        class="w-100 d-flex justify-space-between text-h5 pa-8"
        :prepend-icon="icon"
        :append-icon="mdiPlusCircleOutline"
        :text="title"
        @click="switchDialog"
    />
    <v-dialog
        class="elevation-16"
        scrim="secondary"
        width="800"
        v-model="dialog"
    >
        <v-card class="text-primary pa-4 ma-0">
            <v-card-title class="mb-4 mx-auto w-75 text-h5">
                {{ title }}
            </v-card-title>
            <v-card-text class="pa-0 mb-4">
                <v-data-table
                    class="text-primary scroll-container text-body-1 w-100 overflow-x-hidden"
                    height="400px"
                    sticky
                    :search="inputSearchProduct"
                    :headers="headers"
                    :items="items"
                    :page.sync="page"
                    :items-per-page="15"
                    @update:page="onPageChange"
                >
                    <template v-slot:top>
                        <v-text-field
                            class="mb-2"
                            clearable
                            autocomplete="off"
                            label="Поиск"
                            v-model="inputSearchProduct"
                        />
                    </template>
                    <template v-slot:item.name="{ item }">
                        <p class="text-subtitle-2">
                            {{ item.name }}
                        </p>
                        <v-icon
                            v-if="item.id > db.length - 1"
                            size="25"
                            :icon="mdiTagHeartOutline"
                        />
                        <small class="text-caption text-medium-emphasis">{{ item.calories }} ккал</small>
                    </template>
                    <template v-slot:item.weight="{ item }">
                        <div class="d-flex justify-space-between align-center">
                            <v-icon
                                class="mr-2"
                                size="20"
                                :icon="mdiPencil"
                            />
                            <v-text-field
                                class="text-subtitle-1"
                                variant="underlined"
                                color="transparent"
                                base-color="transparent"
                                bg-color="transparent"
                                width="60px"
                                suffix="г"
                                maxlength="6"
                                autocomplete="off"
                                v-model="item.weight"
                                :rules="[checkValidNumValues]"
                            />
                        </div>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-checkbox
                            density="compact"
                            hide-details
                            :value="item"
                            :false-icon="mdiCheckboxBlankCircleOutline"
                            :true-icon="mdiCheckboxMarkedCircleOutline"
                            v-model="listProducts"
                        />
                    </template>
                    <template v-slot:bottom>
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
                    <template v-slot:no-data>
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
