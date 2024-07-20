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
    mdiClose,
    mdiCheck,
    mdiCheckBold
} from '@mdi/js';
import { ref, computed, onMounted, watch } from 'vue';
import { useCalendarStore } from '../stores/Calendar.js';
import { useProductStore } from '../stores/Products.js';
import db from '../../db.json';
import { useDisplay } from 'vuetify';

const calendarStore = useCalendarStore();
const productStore = useProductStore();

const props = defineProps({
    day: Object,
    title: String,
    type: String,
    icon: String
});

const dialog = ref(false);
const page = ref(1);
const inputSearchProduct = ref('');
const headers = ref([
    {
        title: 'Продукты',
        align: 'start',
        key: 'name'
    },
    {
        key: 'weight',
        width: '140px',
        sortable: false
    },
    {
        width: '50px',
        key: 'actions',
        sortable: false
    }
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
    return listProducts.value.length && listProducts.value.every((item) => checkValidNumValues(item?.weight));
});

const onPageChange = (isAdd) => {
    if (isAdd) page.value += 1;
    else if (page.value > 1) page.value -= 1;
};

const { mobile, name } = useDisplay();
const isMobile = ref(mobile.value);
watch(
    () => mobile.value,
    () => {
        isMobile.value = mobile.value;
    }
);
const adaptiveWidth = computed(() => {
    switch (name.value) {
        case 'xs':
            return 280;
        case 'sm':
            return 380;
        case 'md':
            return 520;
        case 'lg':
            return 800;
        default:
            return 900;
    }
});
const adaptiveHeight = computed(() => {
    switch (name.value) {
        case 'xs':
            return 280;
        default:
            return 400;
    }
});

onMounted(() => initialize());
</script>

<template>
    <v-btn
        class="w-100 d-flex justify-space-between text-h6 text-sm-h5 font-weight-bold pa-6 pa-sm-8"
        :prepend-icon="icon"
        :append-icon="mdiPlusCircleOutline"
        :text="title"
        @click="switchDialog"
    />
    <v-dialog
        v-model="dialog"
        class="elevation-16"
        scrim="primary"
        :width="adaptiveWidth"
    >
        <v-card class="text-primary pa-2 pa-md-4 ma-0">
            <v-card-title
                class="mx-auto text-center w-75 text-h6 text-sm-h5 font-weight-bold pa-0 mb-2 mb-sm-4 mb-md-6"
            >
                {{ title }}
            </v-card-title>
            <v-card-text class="pa-0 mb-2 mb-md-4">
                <v-data-table
                    v-model:page="page"
                    class="text-primary scroll-container text-caption text-sm-body-2 text-lg-body-1 text-break"
                    :height="adaptiveHeight"
                    sticky
                    :mobile="false"
                    :search="inputSearchProduct"
                    :headers="headers"
                    :items="items"
                    :items-per-page="15"
                    @update:page="onPageChange"
                >
                    <template #top>
                        <v-text-field
                            v-model="inputSearchProduct"
                            class="mb-2 pt-md-2"
                            clearable
                            autocomplete="off"
                            label="Поиск"
                        />
                    </template>
                    <template
                        v-if="isMobile"
                        #headers
                    />
                    <!--                        <tr>-->
                    <!--                            <td>{{ headers[0].title }}</td>-->
                    <!--                            <td v-if="!mobileSize" />-->
                    <!--
                     <td v-if="!mobileSize" />-->
                    <!--                        </tr>-->
                    <!--                    </template>-->
                    <template #item="{ item }">
                        <tr>
                            <td>
                                <label :for="item.id">
                                    <p>
                                        <p class="text-subtitle-2 mb-1">
                                            {{ item.name }}
                                        </p>
                                        <v-icon
                                            v-if="item.id > db.length - 1"
                                            class=""
                                            size="25"
                                            :icon="mdiTagHeartOutline"
                                        />
                                        <span class="text-caption text-medium-emphasis">{{ item.calories }} ккал</span>
                                    </p>

                                    <v-row
                                        v-if="isMobile"
                                        class="align-center justify-space-between"
                                        no-gutters
                                        dense
                                    >
                                        <v-col cols="auto">
                                            <v-text-field
                                                v-model="item.weight"
                                                class="text-subtitle-1"
                                                variant="underlined"
                                                base-color="transparent"
                                                bg-color="transparent"
                                                width="80px"
                                                suffix="г"
                                                maxlength="6"
                                                autocomplete="off"
                                                :rules="[checkValidNumValues]"
                                            >
                                                <template #prepend-inner>
                                                    <v-icon
                                                        color="primary opacity-100"
                                                        size="20"
                                                        :icon="mdiPencil"
                                                    />
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-checkbox
                                                v-model="listProducts"
                                                density="compact"
                                                hide-details
                                                :id="item.id"
                                                :value="item"
                                                :false-icon="mdiCheckboxBlankCircleOutline"
                                                :true-icon="mdiCheckboxMarkedCircleOutline"
                                            />
                                        </v-col>
                                    </v-row>
                                </label>
                            </td>
                            <td class="px-8 " v-if="!isMobile">
                                <v-text-field
                                    v-model="item.weight"
                                    class="text-subtitle-1 "
                                    variant="underlined"
                                    base-color="transparent"
                                    bg-color="transparent"
                                    width="80px"
                                    suffix="г"
                                    maxlength="6"
                                    autocomplete="off"
                                    :rules="[checkValidNumValues]"
                                >
                                    <template #prepend-inner>
                                        <v-icon
                                            class=""
                                            color="primary opacity-100"
                                            size="20"
                                            :icon="mdiPencil"
                                        />
                                    </template>
                                </v-text-field>
                            </td>
                            <td
                                class="pa-0"
                                v-if="!isMobile"
                            >
                                <v-checkbox
                                    v-model="listProducts"
                                    hide-details
                                    :id="item.id"
                                    :value="item"
                                    :false-icon="mdiCheckboxBlankCircleOutline"
                                    :true-icon="mdiCheckboxMarkedCircleOutline"
                                />
                            </td>
                        </tr>
                    </template>
                    <template #bottom>
                        <v-row
                            class="justify-space-between align-center"
                            no-gutters
                        >
                            <v-col cols="3">
                                <v-btn
                                    v-if="isMobile"
                                    class="text-surface bg-primary"
                                    variant="outlined"
                                    :icon="mdiClose"
                                    size="40"
                                    @click="switchDialog"
                                />
                                <v-btn
                                    v-else
                                    class="text-surface bg-primary text-caption text-sm-button text-uppercase"
                                    text="Отмена"
                                    variant="outlined"
                                    @click="switchDialog"
                                />
                            </v-col>
                            <v-col class="text-center d-flex align-center justify-center pa-0 ma-0">
                                <div>
                                    <v-btn
                                        variant="text"
                                        :icon="mdiArrowLeftBoldCircleOutline"
                                        @click="onPageChange(false)"
                                    />
                                    <span class="text-body-2 text-sm-body-1  mx-sm-2">{{ page }}</span>
                                    <v-btn
                                        variant="text"
                                        :icon="mdiArrowRightBoldCircleOutline"
                                        @click="onPageChange(true)"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="3" class="d-flex justify-end">
                                <v-btn
                                    v-if="isMobile"
                                    class="text-surface bg-primary"
                                    variant="outlined"
                                    size="40"
                                    :icon="mdiCheck"
                                    :disabled="!checkValidData"
                                    @click="adding"
                                />
                                <v-btn
                                    v-else
                                    class="text-surface bg-primary text-caption text-sm-button text-uppercase"
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
