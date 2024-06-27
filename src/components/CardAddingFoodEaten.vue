<script setup>
import {
    mdiArrowLeftBoldCircleOutline,
    mdiArrowRightBoldCircleOutline,
    mdiBedEmpty,
    mdiCheckboxBlankCircleOutline,
    mdiPencil,
    mdiPlusCircleOutline,
    mdiWeatherSunsetUp,
} from '@mdi/js';
import { onBeforeMount, ref, onMounted, onUpdated, watch, computed } from 'vue';
import { useCalendarStore } from '../stores/Calendar.js';
import { useProductStore } from '../stores/Products.js';
import { mdiWeatherSunset, mdiCheck, mdiCheckboxMarkedCircleOutline } from '@mdi/js';

const calendarStore = useCalendarStore();
const productStore = useProductStore();

const props = defineProps({
    day: Object,
    title: String,
    type: String,
    icon: String,
});

const dialog = ref(false);
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
        width: '10%',
        sortable: false,
    },
]);

const items = ref([]);
const listProducts = ref([]);

const switchDialog = () => {
    dialog.value = !dialog.value;
};
const adding = () => {
    switchDialog();
    calendarStore.addToMealList(props.day, props.type, listProducts.value);
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

const page = ref(1);
const onPageChange = (isAdd) => {
    if (isAdd) {
        page.value += 1;
    } else {
        if (page.value > 1) page.value -= 1;
    }
};
</script>

<template>
    <v-btn
        class="w-100 d-flex justify-space-between text-h5 font-weight-bold py-8 px-8"
        :prepend-icon="icon"
        :append-icon="mdiPlusCircleOutline"
        :text="title"
        @click="switchDialog"
    >
    </v-btn>
    <v-dialog v-model="dialog">
        <v-card
            class="mx-auto text-primary"
            elevation="18"
            width="800"
        >
            <v-card-title class="mt-4 mx-auto font-weight-bold text-h5">
                {{ title }}
            </v-card-title>
            <v-card-text class="pt-0">
                <v-data-table
                    class="text-primary scroll-container"
                    height="400px"
                    :search="inputSearchProduct"
                    sticky
                    :headers="headers"
                    :items="items"
                    :page.sync="page"
                    @update:page="onPageChange"
                    :items-per-page="15"
                >
                    <template v-slot:top>
                        <v-container>
                            <v-text-field
                                clearable
                                autocomplete="off"
                                label="Поиск"
                                v-model="inputSearchProduct"
                            />
                        </v-container>
                    </template>
                    <template v-slot:item.name="{ item }">
                        <p class="text-subtitle-1">
                            {{ item.name }}
                        </p>
                        <small class="text-caption text-medium-emphasis">{{ item.calories }} ккал</small>
                    </template>
                    <template v-slot:item.weight="{ item }">
                        <div class="d-flex justify-space-between align-center">
                            <v-icon
                                class="mr-2"
                                size="20"
                            >
                                {{ mdiPencil }}
                            </v-icon>
                            <v-text-field
                                variant="underlined"
                                color="transparent"
                                base-color="transparent"
                                bg-color="transparent"
                                width="60px"
                                suffix="г"
                                v-model="item.weight"
                                :rules="[checkValidNumValues]"
                                maxlength="6"
                                autocomplete="off"
                            />
                        </div>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-checkbox
                            v-model="listProducts"
                            :value="item"
                            density="compact"
                            :false-icon="mdiCheckboxBlankCircleOutline"
                            :true-icon="mdiCheckboxMarkedCircleOutline"
                            hide-details
                        />
                    </template>
                    <template v-slot:bottom>
                        <v-row
                            class="mt-4"
                            no-gutters
                            justify="space-between"
                            align="center"
                        >
                            <v-col cols="auto">
                                <v-btn
                                    class="text-surface bg-primary"
                                    text="Отмена"
                                    variant="outlined"
                                    @click="switchDialog"
                                />
                            </v-col>
                            <v-col cols="auto">
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
                            <v-col cols="auto">
                                <v-btn
                                    class="text-surface bg-primary"
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
                            <v-card-text> Пусто</v-card-text>
                        </v-card>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
