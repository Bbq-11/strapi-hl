<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/Products.js';
import AddingNewProduct from './AddingNewProduct.vue';
import db from '../../db';
import { mdiClose, mdiPencil } from '@mdi/js';
import EditProduct from './EditProduct.vue';
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

const dialog = ref(false);
// const dialogDelete = ref(false);
const editedItem = ref({
    name: 'a',
    calories: '12',
    proteins: '1',
    fats: 0,
    carbs: 0,
});
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
        :headers="headers"
        :items="productStore.searchProducts(inputSearchProduct)"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-text-field
                    class="mt-5 mx-auto mb-2"
                    width="25%"
                    density="compact"
                    variant="outlined"
                    label="Поиск"
                    v-model="inputSearchProduct"
                />
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <!--                <AddingNewProduct />-->
                <ActionsNewProducts
                    :product="defaultItem"
                    :text="'Добавить новый продукт'"
                    :variant="'add'"
                />
            </v-toolbar>
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
