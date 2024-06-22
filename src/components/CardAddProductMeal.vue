<script setup>
import { mdiPlusCircleOutline, mdiWeatherSunsetUp } from '@mdi/js';
import { onBeforeMount, ref, onMounted, onUpdated, watch } from 'vue';
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
        title: 'Dessert (100g serving)',
        align: 'start',
        width: '80%',
        key: 'name',
    },
    // {
    //     paddingX: '240px',
    //     key: 'calories',
    // },
    //
    // {
    //     paddingX: '240px',
    //     key: 'proteins',
    // },
    //
    // {
    //     paddingX: '240px',
    //     key: 'fats',
    // },
    //
    // {
    //     paddingX: '240px',
    //     key: 'carbs',
    // },
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
    calendarStore.addMeal(props.day, props.type, listProducts.value);
    listProducts.value.length = 0;
    initialize();
    dialog.value = false;
};

onBeforeMount(() => {
    initialize();
});

const initialize = () => {
    let bb = [...productStore.searchProducts(inputSearchProduct)];
    bb.map((item) => (item.weight = '100'));
    items.value = bb;
};
</script>

<template>
    <v-btn
        class="w-100 d-flex justify-space-between text-h4 py-8 px-8"
        :prepend-icon="icon"
        :append-icon="mdiPlusCircleOutline"
        :text="title"
        @click="switchDialog"
    >
    </v-btn>
    <v-dialog v-model="dialog">
        <v-card
            class="mx-auto"
            width="800"
        >
            <v-card-title class="mt-4 mx-auto">
                {{ title }}
            </v-card-title>
            <v-card-text>
                <v-data-table
                    class="overflow-y-auto justify-space-between"
                    height="400px"
                    :headers="headers"
                    :items="productStore.searchProducts(inputSearchProduct)"
                >
                    <template v-slot:top>
                        <v-container>
                            <v-text-field
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
                            width="100px"
                            variant="outlined"
                            hideDetails="auto"
                            density="compact"
                            autocomplete="off"
                            suffix="г."
                            v-model="item.weight"
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
                        text="Добавить продукты)"
                        @click="adding"
                    />
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>
