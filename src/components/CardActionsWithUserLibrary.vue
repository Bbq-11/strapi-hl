<script setup>
import { computed, reactive, ref } from 'vue';
import { mdiPencil, mdiPlus } from '@mdi/js';
import { useProductStore } from '../stores/Products.js';

const productStore = useProductStore();
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

const dialog = ref(false);
const item = reactive({
    name: props.product.name,
    calories: props.product.calories,
    proteins: props.product.proteins,
    fats: props.product.fats,
    carbs: props.product.carbs,
});
const listTitleForTextField = ['Название продукта', 'Ккал', 'Белки', 'Жиры', 'Углеводы'];

const editProduct = () => {
    switchDialog();
    if (props.isAdd) {
        productStore.addProduct(item);
        item.name = '';
        item.calories = 0;
        item.proteins = 0;
        item.fats = 0;
        item.carbs = 0;
    } else productStore.editProduct(item, props.product);
};
const switchDialog = () => (dialog.value = !dialog.value);
const checkValidStringValues = (value, minLength = 1, maxLength = 100) => {
    const regex = new RegExp(`^.{${minLength},${maxLength}}$`);
    return regex.test(value);
};
const checkValidNumValues = (value) => {
    return /^(0|[1-9][0-9]{0,3}(\.[0-9]{0,2})?|0\.[0-9]{0,2})$/.test(value);
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
        class="text-subtitle-2"
        text="Добавить новый продукт"
        :prepend-icon="mdiPlus"
        @click="dialog = true"
    />
    <v-icon
        v-else
        class="mr-2"
        :icon="mdiPencil"
        size="20"
        @click="dialog = true"
    />
    <v-dialog
        class="elevation-16"
        scrim="primary"
        width="600"
        v-model="dialog"
    >
        <v-card class="pa-4">
            <v-card-title class="mx-auto w-75 text-primary text-h5 mb-4">
                {{ props.text }}
            </v-card-title>
            <v-card-text class="pa-0 mb-2">
                <v-row
                    class="mb-0 gr-2"
                    dense
                >
                    <template
                        v-for="(key, value, index) in item"
                        :key="index"
                    >
                        <v-col :cols="value === 'name' ? 12 : 3">
                            <v-text-field
                                class="text-subtitle-1"
                                v-model="item[value]"
                                :maxlength="value === 'name' ? 100 : 6"
                                base-color="primary"
                                autocomplete="off"
                                :label="listTitleForTextField[index]"
                                :rules="value === 'name' ? [checkValidStringValues] : [checkValidNumValues]"
                            />
                        </v-col>
                    </template>
                </v-row>
                <small class="text-caption text-primary text-body-2">*Показатели для порции в 100гр.</small>
            </v-card-text>
            <v-card-actions class="pa-0">
                <v-row
                    no-gutters
                    justify="space-between"
                >
                    <v-col cols="auto">
                        <v-btn
                            class="text-surface bg-primary text-subtitle-2"
                            variant="outlined"
                            text="Отмена"
                            @click="switchDialog"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            class="text-surface bg-primary text-subtitle-2"
                            :text="props.isAdd ? 'Добавить' : 'Редактировать'"
                            :disabled="!checkValidData"
                            @click="editProduct"
                        />
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
