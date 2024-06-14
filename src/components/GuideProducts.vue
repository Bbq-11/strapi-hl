<script setup>
import db from '../../db.json';
import { computed, ref, watch } from 'vue';
import { mdiPlus } from '@mdi/js';

localStorage.setItem('myLibrary', JSON.stringify([{ name: 'Lifestyle' }, { name: 'AbGG' }, { name: 'Абрикос с ЛА' }]));

const inputSearchProduct = ref('');
const searhProducts = () => {
    const newDB = db.filter((el) => el.name.toLowerCase().includes(inputSearchProduct.value.toLowerCase()));
    if (localStorage.getItem('myLibrary') !== null) {
        const library = JSON.parse(localStorage.getItem('myLibrary'));
        return library
            .filter((el) => el.name.toLowerCase().includes(inputSearchProduct.value.toLowerCase()))
            .concat(newDB);
    }
    return newDB;
};

const dialog = ref(false);
</script>

<template>
    <v-text-field
        class="mt-5 mx-auto mb-2"
        width="25%"
        clearable
        density="compact"
        variant="outlined"
        label="Поиск"
        v-model="inputSearchProduct"
    />

    <div class="text-center mb-2">
        <v-btn
            class="w-auto mx-auto"
            :prepend-icon="mdiPlus"
            text="Добавить свой продукт"
            @click="dialog = true"
        />
    </div>
    <v-dialog v-model="dialog">
        <v-card
            class="mx-auto"
            width="600"
        >
            <v-card-title> Добавить свой продукт</v-card-title>
            <v-card-text>
                <v-row dense>
                    <v-col>
                        <v-text-field
                            variant="outlined"
                            placeholder="Название продукта"
                            hint="Введите название продукта"
                            required
                        />
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col cols="5">
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            label="Энергетическая ценность"
                            required
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            label="Белки"
                            required
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            label="Жиры"
                            required
                        />
                    </v-col>
                    <v-col>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            label="Углеводы"
                            required
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
                            @click="dialog = false"
                        />
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
    {{ searhProducts() }}
</template>

<style scoped></style>
