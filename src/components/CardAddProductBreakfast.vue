<script setup>
import { mdiPlusCircleOutline, mdiWeatherSunsetUp } from '@mdi/js';
import { ref } from 'vue';
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

const isOpen = ref(false);
const listProducts = ref([]);
const inputSearchProduct = ref('');
const headers = ref([
    {
        title: 'Dessert (100g serving)',
        align: 'start',
        key: 'name',
        width: '60%',
    },
    {
        paddingX: '240px',
        key: 'calories',
    },

    {
        paddingX: '240px',
        key: 'proteins',
    },

    {
        paddingX: '240px',
        key: 'fats',
    },

    {
        paddingX: '240px',
        key: 'carbs',
    },
    {
        key: 'actions',
        justify: 'center',
        sortable: false,
    },
]);

const switchOpen = () => {
    isOpen.value = !isOpen.value;
};
const adding = () => {
    calendarStore.addMeal(props.day, props.type, listProducts.value);
    listProducts.value.length = 0;
    isOpen.value = false;
};
</script>

<template>
    <v-btn
        class="w-100 d-flex justify-space-between text-h4 py-8 px-6"
        :prepend-icon="icon"
        :append-icon="mdiPlusCircleOutline"
        :text="title"
        @click="switchOpen"
    >
    </v-btn>
    <v-dialog v-model="isOpen">
        <v-card
            class="mx-auto"
            width="800"
        >
            <v-card-title class="mx-auto">
                {{ title }}
            </v-card-title>
            <v-card-text>
                <v-data-table
                    class="mt-8 overflow-y-auto"
                    height="400px"
                    :headers="headers"
                    :items="productStore.searchProducts(inputSearchProduct)"
                >
                    <template v-slot:top>
                        <v-container>
                            <v-row
                                no-gutters
                                justify="space-between"
                                align="center"
                            >
                                <v-col>
                                    <v-text-field
                                        clearable
                                        hide-details="auto"
                                        density="compact"
                                        variant="outlined"
                                        label="Поиск"
                                        v-model="inputSearchProduct"
                                    />
                                </v-col>
                            </v-row>
                            {{ listProducts }}
                        </v-container>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-checkbox
                            v-model="listProducts"
                            :value="{
                                ...item,
                                weight: 100,
                            }"
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
                <v-btn
                    class="w-100 d-flex justify-space-between text-h5 py-8 px-6"
                    :prepend-icon="icon"
                    :append-icon="mdiPlusCircleOutline"
                    text="Добавить продукты)"
                    @click="adding"
                >
                </v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>
