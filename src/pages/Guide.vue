<script setup>
import { ref } from 'vue';
import { useProductStore } from '../stores/Products.js';
import db from '../../db';
import { mdiBedEmpty, mdiClose, mdiFlaskEmpty } from '@mdi/js';
import CardActionsWithUserLibrary from '../components/CardActionsWithUserLibrary.vue';

const productStore = useProductStore();

const inputSearchProduct = ref('');

const headers = ref([
    {
        title: 'Продукты',
        align: 'start',
        key: 'name',
        maxWidth: '400px',
    },
    {
        title: 'Каллории',
        align: 'center',
        paddingX: '240px',
        key: 'calories',
    },
    {
        title: 'Белки (гр)',
        align: 'center',
        key: 'proteins',
    },
    {
        title: 'Жиры (гр)',
        align: 'center',
        key: 'fats',
    },
    {
        title: 'Углеводы (гр)',
        align: 'center',
        key: 'carbs',
    },
    {
        key: 'actions',
        sortable: false,
    },
]);
</script>

<template>
    <v-card>
        <v-data-table
            class="mt-4 mb-2 text-primary scroll-container"
            height="500px"
            density="compact"
            items-per-page="-1"
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
                        size="small"
                        :icon="mdiClose"
                        @click="productStore.removeProduct(item.id)"
                    />
                </div>
            </template>
            <template v-slot:bottom />
            <template v-slot:no-data>
                <v-sheet
                    class="d-flex justify-center align-center"
                    height="400px"
                >
                    <v-card elevation="0">
                        <v-card-title>
                            <v-icon>
                                {{ mdiBedEmpty }}
                            </v-icon>
                        </v-card-title>
                        <v-card-text> Пусто</v-card-text>
                    </v-card>
                </v-sheet>
            </template>
        </v-data-table>
    </v-card>
</template>

<style scoped></style>
