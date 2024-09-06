<script setup>
import {
    mdiArrowLeftBoldCircleOutline,
    mdiArrowRightBoldCircleOutline,
    mdiCheckboxBlankCircleOutline,
    mdiPencil,
    mdiPlusCircleOutline,
    mdiTagHeartOutline,
    mdiCheckboxMarkedCircleOutline,
    mdiClose,
    mdiCheck,
    mdiFoodApple,
} from '@mdi/js';
import { ref, computed, onMounted, watch } from 'vue';
import { useCalendarStore } from '../stores/Calendar.js';
import { useProductStore } from '../stores/Products.js';
import { useDisplay } from 'vuetify';

const calendarStore = useCalendarStore();
const productStore = useProductStore();
const { mobile, name } = useDisplay();

const props = defineProps({
    day: Object,
    title: String,
    type: String,
    icon: String,
});

const isMobile = ref(mobile.value);
const dialog = ref(false);
const page = ref(1);
const inputSearchProduct = ref('');
const headers = ref([
    {
        title: 'Продукты',
        align: 'start',
        key: 'name',
    },
    {
        key: 'weight',
        width: '140px',
        sortable: false,
    },
    {
        width: '50px',
        key: 'actions',
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
const initialize = async () => {
    if (!productStore.products.length) setTimeout(() => initialize(), 0);
    else {
        const actualInfo = productStore.products;
        [...actualInfo].map((item) => (item.weight = '100'));
        items.value = actualInfo;
    }
};

const onPageChange = (isAdd) => {
    if (isAdd) page.value += 1;
    else if (page.value > 1) page.value -= 1;
};
const checkValidNumValues = (value) => {
    return /^([1-9][0-9]{0,3}(\.[0-9]{0,2})?|0\.[0-9]{0,2})$/.test(value);
};

const checkValidData = computed(() => {
    return listProducts.value.length && listProducts.value.every((item) => checkValidNumValues(item?.weight));
});
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

watch(
    () => mobile.value,
    () => {
        isMobile.value = mobile.value;
    },
);

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
        :width="adaptiveWidth"
    >
        <v-card class="text-primary pa-2 pa-sm-4 ma-0">
            <v-card-title
                class="mx-auto text-center w-75 text-h6 text-sm-h5 font-weight-bold pa-0 mb-2 mb-sm-4 mb-md-6"
            >
                {{ title }}
            </v-card-title>
            <v-card-text class="pa-0">
                <v-data-table
                    v-model:page="page"
                    class="text-primary scroll-container text-caption text-sm-body-2 text-lg-body-1 text-break"
                    sticky
                    :height="adaptiveHeight"
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
                    <template #item="{ item }">
                        <tr>
                            <td>
                                <label :for="item.privateID">
                                    <v-container class="px-0 py-1 pa-sm-2">
                                        <span class="text-subtitle-2 mb-1">
                                            {{ item.name }}
                                        </span>
                                        <v-row
                                            class="align-end justify-space-between gc-8"
                                            no-gutters
                                            dense
                                        >
                                            <v-col class="d-flex flex-column flex-sm-row">
                                                <v-icon
                                                    v-if="
                                                        +item.privateID >
                                                        +productStore.products[productStore.products.length - 1]
                                                            .privateID
                                                    "
                                                    :size="isMobile ? 20 : 25"
                                                    :icon="mdiTagHeartOutline"
                                                />
                                                <span class="text-caption text-medium-emphasis">
                                                    {{ item.calories }} ккал
                                                </span>
                                            </v-col>
                                            <v-col
                                                v-if="isMobile"
                                                cols="auto"
                                            >
                                                <v-text-field
                                                    v-model="item.weight"
                                                    variant="underlined"
                                                    base-color="transparent"
                                                    bg-color="transparent"
                                                    width="70px"
                                                    suffix="г"
                                                    maxlength="6"
                                                    autocomplete="off"
                                                    :rules="[checkValidNumValues]"
                                                >
                                                    <template #prepend-inner>
                                                        <v-icon
                                                            color="primary opacity-100 h-100"
                                                            size="15"
                                                            :icon="mdiPencil"
                                                        />
                                                    </template>
                                                </v-text-field>
                                            </v-col>
                                            <v-col
                                                v-if="isMobile"
                                                cols="auto"
                                            >
                                                <v-checkbox
                                                    v-model="listProducts"
                                                    density="compact"
                                                    hide-details
                                                    :id="item.privateID"
                                                    :value="item"
                                                    :false-icon="mdiCheckboxBlankCircleOutline"
                                                    :true-icon="mdiCheckboxMarkedCircleOutline"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </label>
                            </td>
                            <td v-if="!isMobile">
                                <v-text-field
                                    v-model="item.weight"
                                    width="100"
                                    variant="underlined"
                                    base-color="transparent"
                                    bg-color="transparent"
                                    autocomplete="off"
                                    suffix="г"
                                    maxlength="6"
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
                            </td>
                            <td
                                v-if="!isMobile"
                                class="pa-0"
                            >
                                <v-checkbox
                                    v-model="listProducts"
                                    hide-details
                                    :id="item.privateID"
                                    :value="item"
                                    :false-icon="mdiCheckboxBlankCircleOutline"
                                    :true-icon="mdiCheckboxMarkedCircleOutline"
                                />
                            </td>
                        </tr>
                    </template>
                    <template #bottom>
                        <v-row
                            class="justify-space-between align-end"
                            no-gutters
                        >
                            <v-col cols="3">
                                <VBtnCard
                                    :size="isMobile ? 40 : 'default'"
                                    :icon="isMobile ? mdiClose : false"
                                    :text="isMobile ? '' : 'Отмена'"
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
                                    <span class="text-body-2 text-sm-body-1 mx-sm-2">{{ page }}</span>
                                    <v-btn
                                        variant="text"
                                        :icon="mdiArrowRightBoldCircleOutline"
                                        @click="onPageChange(true)"
                                    />
                                </div>
                            </v-col>
                            <v-col
                                cols="3"
                                class="d-flex justify-end"
                            >
                                <VBtnCard
                                    :size="isMobile ? 40 : 'default'"
                                    :icon="isMobile ? mdiCheck : false"
                                    :text="isMobile ? '' : 'Добавить'"
                                    :disabled="!checkValidData"
                                    @click="adding"
                                />
                            </v-col>
                        </v-row>
                    </template>
                    <template #no-data>
                        <v-card
                            class="d-flex flex-column align-center mt-12 text-primary"
                            elevation="0"
                        >
                            <v-card-title>
                                <v-icon
                                    :icon="mdiFoodApple"
                                    :size="isMobile ? 60 : 90"
                                />
                            </v-card-title>
                            <v-card-text class="text-h6 text-sm-h5">Пусто</v-card-text>
                        </v-card>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
