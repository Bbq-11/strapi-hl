<script setup>
import { computed, ref } from 'vue';
import { mdiClose, mdiTableSearch } from '@mdi/js';
import CardActionsWithUserLibrary from '../components/CardActionsWithUserLibrary.vue';
import { useProductStore } from '../stores/Products.js';
import db from '../../db';
import { useDisplay } from 'vuetify';

const productStore = useProductStore();

const inputSearchProduct = ref('');
const headers = [
    {
        minWidth: '200px',
        width: '60%',
        title: 'Продукт',
        align: 'start',
        key: 'name',
        cellProps: { class: 'title-table' },
    },
    {
        title: 'Калории',
        nowrap: true,
        align: 'center',
        key: 'calories',
    },
    {
        title: 'Белки (г)',
        nowrap: true,
        align: 'center',
        key: 'proteins',
    },
    {
        title: 'Жиры (г)',
        nowrap: true,
        align: 'center',
        key: 'fats',
    },
    {
        title: 'Углеводы (г)',
        nowrap: true,
        align: 'center',
        key: 'carbs',
    },
    {
        minWidth: '90px',
        key: 'actions',
        sortable: false,
    },
];
const { name } = useDisplay();

const adaptiveWidth = computed(() => {
    switch (name.value) {
        case 'xs':
            return 280;
        case 'sm':
            return 400;
        case 'md':
            return 580;
        case 'lg':
            return 900;
        case 'xl':
            return 1200;
        case 'xxl':
            return 1800;
        default:
            return 1200;
    }
});
const adaptiveHeight = computed(() => {
    switch (name.value) {
        case 'xs':
            return 320;
        case 'sm':
            return 400;
        case 'md':
            return 460;
        case 'lg':
            return 480;
        case 'xl':
            return 520;
        case 'xxl':
            return 600;
        default:
            return 2000;
    }
});
</script>

<template>
    <v-card
        class="mx-auto"
        :width="adaptiveWidth"
    >
        <v-data-table-virtual
            class="mt-4 mb-2 text-primary scroll-container text-caption text-sm-body-2 text-lg-body-1 text-break"
            density="compact"
            fixed-header
            items-per-page="-1"
            :height="adaptiveHeight"
            :search.lazy="inputSearchProduct"
            :headers="headers"
            :items="productStore.products"
        >
            <template #top>
                <v-container>
                    <v-row
                        class="justify-space-between align-center gr-2"
                        no-gutters
                    >
                        <v-col
                            cols="12"
                            sm="5"
                            md="4"
                        >
                            <v-text-field
                                v-model="inputSearchProduct"
                                class="text-subtitle-1"
                                base-color="primary"
                                autocomplete="off"
                                label="Поиск"
                            />
                        </v-col>
                        <v-col
                            cols="12"
                            sm="auto"
                        >
                            <CardActionsWithUserLibrary
                                text="Добавить новый продукт"
                                :isAdd="true"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </template>
            <template #[`item.actions`]="{ item }">
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
            <template #bottom />
            <template #no-data>
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
