import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import db from '../../db';

export const useProductStore = defineStore('productStore', () => {
    const products = ref([]);

    const addProducts = () => {
        const productsLS = localStorage.getItem('myLibrary');
        if (productsLS !== null) products.value = JSON.parse(productsLS);
        for (let i in db) {
            products.value.push({
                id: i,
                name: db[i].name,
                calories: Number(db[i].calories.match(/\d+/)),
                proteins: Number(db[i].proteins.match(/\d+/)),
                fats: Number(db[i].fats.match(/\d+/)),
                carbs: Number(db[i].carbs.match(/\d+/)),
            });
        }
    };

    const addProduct = (item) => {
        const product = {
            id: Date.now(),
            name: item.name,
            calories: Number(String(item.calories).match(/\d+/)),
            proteins: Number(String(item.proteins).match(/\d+/)),
            fats: Number(String(item.fats).match(/\d+/)),
            carbs: Number(String(item.carbs).match(/\d+/)),
        };
        products.value.unshift(product);
        const productsLS = JSON.parse(localStorage.getItem('myLibrary')) || [];
        productsLS.unshift(product);
        localStorage.setItem('myLibrary', JSON.stringify(productsLS));
    };

    const searchProducts = (inputValue) => {
        return products.value.filter((el) => el.name.toLowerCase().includes(inputValue.toLowerCase()));
    };

    const removeProduct = (id) => {
        products.value = products.value.filter((item) => item?.id !== id);
        const productsLS = JSON.parse(localStorage.getItem('myLibrary'));
        localStorage.setItem('myLibrary', JSON.stringify(productsLS.filter((item) => item?.id !== id)));
    };
    const editProduct = (newItem, lastItem) => {
        const item = products.value.findIndex((el) => el.id === lastItem.id);
        products.value[item] = Object.assign(products.value[item], newItem);

        const productsLS = JSON.parse(localStorage.getItem('myLibrary'));
        const itemLS = productsLS.findIndex((el) => el.id === lastItem.id);
        productsLS[itemLS] = Object.assign(productsLS[itemLS], newItem);
        localStorage.setItem('myLibrary', JSON.stringify(productsLS));
    };

    return {
        products,
        addProducts,
        addProduct,
        searchProducts,
        removeProduct,
        editProduct,
    };
});
