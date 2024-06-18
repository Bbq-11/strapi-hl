<script setup>
import { reactive, ref } from 'vue';
import { mdiPencil, mdiPlus } from '@mdi/js';

import { useProductStore } from '../stores/Products.js';

const productStore = useProductStore();

const dialog = ref(false);

const props = defineProps({
    product: Object,
});

const item = reactive({
    name: props.product.name,
    calories: props.product.calories,
    proteins: props.product.proteins,
    fats: props.product.fats,
    carbs: props.product.carbs,
});

const submitProduct = () => {
    productStore.editProduct(item, props.product);
    dialog.value = false;
};
</script>

<template>
    <v-icon
        class="mr-2"
        @click="dialog = true"
    >
        {{ mdiPencil }}
    </v-icon>
    <v-dialog v-model="dialog">
        <v-card
            class="mx-auto"
            width="600"
        >
            <v-card-title class="mx-auto"> Добавить свой продукт</v-card-title>
            <v-card-text>
                <v-row dense>
                    <v-col>
                        <v-text-field
                            v-model="props.product.name"
                            variant="outlined"
                            label="Название продукта"
                        />
                        {{ props.product.name }}
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            v-model="item.calories"
                            variant="outlined"
                            label="Энергетическая ценность"
                        />

                        {{ item.calories }}
                    </v-col>
                </v-row>

                <v-row dense>
                    <v-col>
                        <v-text-field
                            v-model="item.proteins"
                            density="compact"
                            variant="outlined"
                            label="Белки"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="item.fats"
                            density="compact"
                            variant="outlined"
                            label="Жиры"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="item.carbs"
                            density="compact"
                            variant="outlined"
                            label="Углеводы"
                        />
                    </v-col>
                </v-row>
                <small class="text-caption text-medium-emphasis">*Показатели для порции в 100гр.</small>
            </v-card-text>
            <v-card-actions>
                <v-row
                    no-gutters
                    justify="space-between"
                >
                    <v-col cols="auto">
                        <v-btn
                            class="ms-auto"
                            text="Отменить"
                            @click="dialog = false"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            class="ms-auto"
                            text="Добавить"
                            @click="submitProduct"
                        />
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>
