<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/Products.js';
import db from '../../db';
import { mdiClose, mdiTableSearch } from '@mdi/js';
import CardActionsWithUserLibrary from '../components/CardActionsWithUserLibrary.vue';

const productStore = useProductStore();

const inputSearchProduct = ref('');

const headers = ref([
    {
        title: 'Продукты',
        align: 'start',
        key: 'name',
        width: '40%',
    },
    {
        title: 'Каллории',
        align: 'center',
        key: 'calories',
    },
    {
        title: 'Белки (г)',
        align: 'center',
        key: 'proteins',
    },
    {
        title: 'Жиры (г)',
        align: 'center',
        key: 'fats',
    },
    {
        title: 'Углеводы (г)',
        align: 'center',
        key: 'carbs',
    },
    {
        width: '100px',
        key: 'actions',
        sortable: false,
    },
]);
</script>

<template>
    <v-card width="100%">
        <v-data-table-virtual
            class="mt-4 mb-2 text-primary scroll-container text-body-1 text-break"
            height="500px"
            density="compact"
            items-per-page="-1"
            width="100%"
            :search.lazy="inputSearchProduct"
            :headers="headers"
            :items="productStore.products"
        >
            <template v-slot:top>
                <v-container>
                    <v-row
                        class="justify-space-between align-center"
                        no-gutters
                    >
                        <v-col cols="6">
                            <v-text-field
                                class="text-subtitle-1"
                                base-color="primary"
                                autocomplete="off"
                                label="Поиск"
                                v-model="inputSearchProduct"
                            />
                        </v-col>
                        <v-col cols="auto">
                            <CardActionsWithUserLibrary
                                text="Добавить новый продукт"
                                :isAdd="true"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </template>
            <template v-slot:item.actions="{ item }">
                <div v-if="item.id > db.length - 1">
                    <CardActionsWithUserLibrary
                        :product="item"
                        :text="item.name"
                        :isAdd="false"
                    />
                    <v-icon
                        size="25"
                        :icon="mdiClose"
                        @click="productStore.removeProduct(item.id)"
                    />
                </div>
            </template>
            <template v-slot:bottom />
            <template v-slot:no-data>
                <div class="my-4">
                    <v-icon
                        size="60"
                        :icon="mdiTableSearch"
                    />
                    <p>Пусто</p>
                </div>
            </template>
        </v-data-table-virtual>
    </v-card>
</template>
