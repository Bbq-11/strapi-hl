<script setup>
import { mdiPlusCircleOutline, mdiWeatherSunsetUp } from '@mdi/js';
import { onBeforeMount, ref, onMounted, onUpdated, watch, computed } from 'vue';
import { useCalendarStore } from '../stores/Calendar.js';
import { useProductStore } from '../stores/Products.js';
import { mdiWeatherSunset } from '@mdi/js';

const calendarStore = useCalendarStore();
const productStore = useProductStore();

const props = defineProps({
    day: Object,
    title: String,
    type: String,
    icon: String,
});

const dialog = ref(false);
const listProducts = ref([]);
const inputSearchProduct = ref('');
const headers = ref([
    {
        title: 'Продукты',
        align: 'start',
        width: '80%',
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

const switchDialog = () => {
    dialog.value = !dialog.value;
};
const adding = () => {
    calendarStore.addMeal(props.day, props.type, listProducts);
    listProducts.value.length = 0;
    // initialize();
    dialog.value = false;
};

const initialize = () => {
    const actualInfo = [...productStore.searchProducts(inputSearchProduct)];
    actualInfo.map((item) => (item.weight = '100'));
    items.value = actualInfo;
};

const checkValidNumValues = (value) => {
    return /^([1-9][0-9]{0,4}(\.[0-9]{0,2})?|0\.[0-9]{0,3})$/.test(value);
};

const checkValidData = computed(() => {
    return listProducts.value.length > 0 && listProducts.value.every((item) => checkValidNumValues(item?.weight));
});

onBeforeMount(() => {
    initialize();
});

watch(
    () => inputSearchProduct.value,
    () => {
        initialize();
    },
);
watch(
    () => calendarStore.calendar,
    () => {
        initialize();
    },
);
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
            <v-card-title class="mt-4 mx-auto">
                {{ title }}
            </v-card-title>
            <v-card-text>
                <v-data-table
                    class="element text-primary scroll-container"
                    height="400px"
                    :headers="headers"
                    :items="productStore.searchProducts(inputSearchProduct)"
                >
                    <template v-slot:top>
                        <v-container>
                            <v-text-field
                                class="opacity-100"
                                color="primary"
                                bg-color="background"
                                clearable
                                hide-details="auto"
                                density="compact"
                                variant="outlined"
                                label="Поиск"
                                v-model="inputSearchProduct"
                            />
                        </v-container>
                    </template>
                    <template v-slot:item.name="{ item }">
                        <div>
                            {{ item.name }}
                        </div>
                        <small class="text-caption text-medium-emphasis">{{ item.calories }} Ккал.</small>
                    </template>
                    <template v-slot:item.weight="{ item }">
                        <v-text-field
                            color="primary"
                            base-color="primary"
                            bg-color="background"
                            width="100px"
                            suffix="г."
                            density="compact"
                            v-model="item.weight"
                            :rules="[checkValidNumValues]"
                            maxlength="5"
                            hide-details
                        >
                        </v-text-field>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-checkbox
                            class="h-75"
                            v-model="listProducts"
                            :value="item"
                        />
                    </template>
                    <template v-slot:no-data>
                        <v-btn
                            color="primary"
                            @click="productStore.addProducts()"
                        >
                            Reset
                        </v-btn>
                    </template>
                </v-data-table>
                <div class="d-flex justify-space-between">
                    <v-btn
                        text="Отмена("
                        @click="switchDialog"
                    />
                    <v-btn
                        v-if="checkValidData"
                        text="Добавить продукты)"
                        @click="adding"
                    />
                    <v-btn
                        v-else
                        disabled
                        text="Добавить продукты)"
                        @click="adding"
                    />
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped>
::v-deep .v-data-table .v-data-table__wrapper::-webkit-scrollbar {
    width: 10px;
}
</style>
