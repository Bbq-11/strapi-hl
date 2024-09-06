<script setup>
import { computed, ref, watch } from 'vue';
import { mdiClose, mdiFoodApple } from '@mdi/js';
import CardActionsWithUserLibrary from '../components/CardActionsWithUserLibrary.vue';
import { useProductStore } from '../stores/Products.js';

import { useDisplay } from 'vuetify';

const productStore = useProductStore();
const { name, mobile } = useDisplay();
const isMobile = ref(mobile.value);

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
        tag: 'div',
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
        default:
            return 1800;
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
            return 800;
    }
});

watch(
    () => mobile.value,
    () => (isMobile.value = mobile.value),
);
</script>

<template>
    <v-card
        class="mx-auto"
        :width="adaptiveWidth"
    >
        <v-data-table-virtual
            class="text-primary scroll-container text-caption text-sm-body-2 text-lg-body-1 text-break mb-2"
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
                                autocomplete="off"
                                label="Поиск"
                            />
                        </v-col>
                        <v-col
                            cols="12"
                            sm="auto"
                        >
                            <CardActionsWithUserLibrary
                                text="Новый продукт"
                                :isAdd="true"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </template>
            <template #body.prepend />
            <template #[`item.actions`]="{ item }">
                <div v-if="+item.privateID > +productStore.products[productStore.products.length - 1].privateID">
                    <CardActionsWithUserLibrary
                        text="Редактирование"
                        :product="item"
                        :isAdd="false"
                    />
                    <v-icon
                        :size="isMobile ? 20 : 25"
                        :icon="mdiClose"
                        @click="productStore.removeProduct(item.privateID)"
                    />
                </div>
            </template>
            <template #bottom />
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
        </v-data-table-virtual>
    </v-card>
</template>
