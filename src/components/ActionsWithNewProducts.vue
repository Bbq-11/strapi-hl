<script setup>
import { computed, reactive, ref } from 'vue';
import { mdiPencil, mdiPlus } from '@mdi/js';

import { useProductStore } from '../stores/Products.js';

const productStore = useProductStore();

const dialog = ref(false);

const props = defineProps({
    product: {
        type: Object,
        required: false,
        default: () => ({
            name: '',
            calories: 0,
            proteins: 0,
            fats: 0,
            carbs: 0,
        }),
    },
    text: String,
    isAdd: Boolean,
});

const item = reactive({
    name: props.product.name,
    calories: props.product.calories,
    proteins: props.product.proteins,
    fats: props.product.fats,
    carbs: props.product.carbs,
});

const addProduct = () => {
    productStore.addProduct(item);
    item.name = '';
    item.calories = 0;
    item.proteins = 0;
    item.fats = 0;
    item.carbs = 0;
    dialog.value = false;
};
const editProduct = () => {
    productStore.editProduct(item, props.product);
    dialog.value = false;
};

const checkValidStringValues = (value, minLength = 1, maxLength = 80) => {
    const regex = new RegExp(`^.{${minLength},${maxLength}}$`);
    return regex.test(value);
};
const checkValidNumValues = (value) => {
    return /^(0|[1-9][0-9]{0,4}(\.[0-9]{0,2})?|0\.[0-9]{0,2})$/.test(value);
};

const checkValidData = computed(() => {
    return (
        checkValidStringValues(item.name) &&
        checkValidNumValues(item.calories) &&
        checkValidNumValues(item.proteins) &&
        checkValidNumValues(item.fats) &&
        checkValidNumValues(item.carbs)
    );
});
</script>

<template>
    <v-btn
        v-if="props.isAdd"
        :prepend-icon="mdiPlus"
        @click="dialog = true"
    >
        Добавить новый продукт
    </v-btn>
    <v-icon
        v-else
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
            <v-card-title class="mx-auto">
                {{ props.text }}
            </v-card-title>
            <v-card-text>
                <v-row
                    class="mb-6"
                    dense
                >
                    <v-col>
                        <v-text-field
                            v-model="item.name"
                            variant="outlined"
                            maxlength="80"
                            hide-details
                            counter
                            label="Название продукта"
                            :rules="[checkValidStringValues]"
                        />
                    </v-col>
                </v-row>

                <v-row dense>
                    <v-col>
                        <v-text-field
                            density="compact"
                            v-model="item.calories"
                            variant="outlined"
                            maxlength="5"
                            label="Ккал"
                            :rules="[checkValidNumValues]"
                            hide-details
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="item.proteins"
                            maxlength="5"
                            density="compact"
                            variant="outlined"
                            label="Белки"
                            :rules="[checkValidNumValues]"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="item.fats"
                            maxlength="5"
                            density="compact"
                            variant="outlined"
                            label="Жиры"
                            :rules="[checkValidNumValues]"
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="item.carbs"
                            maxlength="5"
                            density="compact"
                            variant="outlined"
                            label="Углеводы"
                            :rules="[checkValidNumValues]"
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
                        <div v-if="!checkValidData">Hea</div>
                        <div v-else>
                            <v-btn
                                v-if="props.isAdd"
                                class="ms-auto"
                                text="Добавить"
                                @click="addProduct"
                            />
                            <v-btn
                                v-else
                                class="ms-auto"
                                text="Редактировать"
                                @click="editProduct"
                            />
                        </div>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>
