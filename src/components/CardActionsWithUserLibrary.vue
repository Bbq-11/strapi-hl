<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { mdiCheck, mdiClose, mdiPencil, mdiPlus } from '@mdi/js';
import { useProductStore } from '../stores/Products.js';
import { useDisplay } from 'vuetify';

const productStore = useProductStore();

const props = defineProps({
    product: {
        type: Object,
        default: () => ({
            name: '',
            calories: '',
            proteins: '',
            fats: '',
            carbs: '',
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
        item.calories = '';
        item.proteins = '';
        item.fats = '';
        item.carbs = '';
    } else productStore.editProduct(item, props.product);
};
const switchDialog = () => (dialog.value = !dialog.value);
const checkValidStringValues = (value, minLength = 1, maxLength = 100) => {
    const regex = new RegExp(`^.{${minLength},${maxLength}}$`);
    return regex.test(value);
};
const checkValidNumValues = (value) => {
    if (value === '') return true;
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
const { name, mobile } = useDisplay();
const adaptiveWidth = computed(() => {
    switch (name.value) {
        case 'sm':
            return 300;
        default:
            return 600;
    }
});
const isMobile = ref(mobile.value);
watch(
    () => mobile.value,
    () => {
        isMobile.value = mobile.value;
    },
);
</script>

<template>
    <v-btn
        block
        v-if="props.isAdd"
        class="text-caption text-md-subtitle-2 text-md-subtitle-1"
        text="Добавить новый продукт"
        :prepend-icon="mdiPlus"
        @click="switchDialog"
    />
    <v-icon
        v-else
        class="mr-2"
        :size="isMobile ? 15 : 20"
        :icon="mdiPencil"
        @click="switchDialog"
    />
    <v-dialog
        v-model="dialog"
        :width="adaptiveWidth"
    >
        <v-card class="px-4 py-2 py-md-4 text-primary">
            <v-card-title class="mx-auto text-center w-75 text-h6 text-sm-h5 font-weight-bold pa-0 mb-4 mb-sm-6">
                {{ props.text }}
            </v-card-title>
            <v-card-text class="pa-0">
                <v-row
                    class="gr-2"
                    dense
                >
                    <template
                        v-for="(key, value, index) in item"
                        :key="value"
                    >
                        <v-col :cols="value === 'name' ? 12 : 3">
                            <v-text-field
                                v-model.trim="item[value]"
                                autocomplete="off"
                                :maxlength="value === 'name' ? 100 : 5"
                                :label="listTitleForTextField[index]"
                                :placeholder="value === 'name' ? '' : '0'"
                                :rules="value === 'name' ? [checkValidStringValues] : [checkValidNumValues]"
                            />
                        </v-col>
                    </template>
                </v-row>
                <small class="text-caption text-body-2">* Показатели для порции в 100гр.</small>
            </v-card-text>
            <v-card-actions class="pa-0">
                <v-row
                    class="justify-space-between align-end"
                    no-gutters
                >
                    <v-col cols="auto">
                        <VBtnCard
                            :size="isMobile ? 40 : 'default'"
                            :icon="isMobile ? mdiClose : false"
                            :text="isMobile ? '' : 'Отмена'"
                            @click="switchDialog"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <VBtnCard
                            :size="isMobile ? 40 : 'default'"
                            :icon="isMobile ? mdiCheck : false"
                            :text="isMobile ? '' : props.isAdd ? 'Добавить' : 'Редактировать'"
                            :disabled="!checkValidData"
                            @click="editProduct"
                        />
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
