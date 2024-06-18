<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/Products.js';
import db from '../../db';
import { mdiClose, mdiPencil } from '@mdi/js';
import ActionsNewProducts from './ActionsNewProducts.vue';

const productStore = useProductStore();

const inputSearchProduct = ref('');

const headers = ref([
    {
        title: 'ID',
        key: 'id',
    },
    {
        title: 'Dessert (100g serving)',
        align: 'start',
        key: 'name',
    },
    {
        title: 'Каллории (Ккал)',
        key: 'calories',
        align: 'center',
    },
    {
        title: 'Белки (гр)',
        key: 'proteins',
        align: 'center',
    },
    {
        title: 'Жиры (гр)',
        key: 'fats',
        align: 'center',
    },
    {
        title: 'Углеводы (гр)',
        key: 'carbs',
        align: 'center',
    },
    {
        title: 'Редактирование',
        key: 'actions',
        align: 'center',
        sortable: false,
    },
]);

const defaultItem = ref({
    name: '',
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
});
</script>

<template>
    <v-data-table
        class="mt-8 overflow-y-auto"
        height="500px"
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
                    <v-col cols="6">
                        <v-text-field
                            clearable
                            hide-details="auto"
                            density="compact"
                            variant="outlined"
                            label="Поиск"
                            v-model="inputSearchProduct"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <ActionsNewProducts
                            :product="defaultItem"
                            :text="'Добавить новый продукт'"
                            :variant="'add'"
                        />
                    </v-col>
                </v-row>
            </v-container>
        </template>
        <template v-slot:item.actions="{ item }">
            <div v-if="item.id > db.length - 1">
                <!--                <EditProduct :product="item" />-->
                <ActionsNewProducts
                    :product="item"
                    :text="item.name"
                    :variant="'edit'"
                />
                <v-icon
                    size="small"
                    @click="productStore.removeProduct(item.id)"
                >
                    {{ mdiClose }}
                </v-icon>
            </div>
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
</template>

<style scoped></style>
