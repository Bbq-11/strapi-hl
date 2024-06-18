<script setup>
import { computed, ref, watch } from 'vue';
import { mdiPlus } from '@mdi/js';
import AddingNewProduct from './AddingNewProduct.vue';

import { useProductStore } from '../stores/Products.js';
import ListProducts from './ListProducts.vue';
import Listtt from './Listtt.vue';

const productStore = useProductStore();

const inputSearchProduct = ref('');
</script>

<template>
    <div>
        <!--        <v-text-field-->
        <!--            class="mt-5 mx-auto mb-2"-->
        <!--            width="25%"-->
        <!--            clearable-->
        <!--            density="compact"-->
        <!--            variant="outlined"-->
        <!--            label="Поиск"-->
        <!--            v-model="inputSearchProduct"-->
        <!--        />-->
        <!--        <AddingNewProduct />-->
        <!--        <ListProducts class="h-100 overflow-y-scroll" />-->
        <Listtt />
    </div>
</template>

<style scoped></style>
