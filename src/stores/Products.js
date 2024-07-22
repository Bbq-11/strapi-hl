import { defineStore } from 'pinia';
import { ref } from 'vue';
import db from '../../db';

export const useProductStore = defineStore('productStore', () => {
    const products = ref([]);

    const formatProduct = (item) => {
        return {
            name: item.name,
            calories: Number(String(item.calories).match(/\d+/)),
            proteins: Number(String(item.proteins).match(/\d+/)),
            fats: Number(String(item.fats).match(/\d+/)),
            carbs: Number(String(item.carbs).match(/\d+/)),
        };
    };
    const addProducts = () => {
        const productsLS = localStorage.getItem('myLibrary');
        if (productsLS) products.value = JSON.parse(productsLS);
        for (let i in db) products.value.push({ id: i, ...formatProduct(db[i]) });
    };
    const addProduct = (item) => {
        const product = {
            id: String(Date.now()),
            ...formatProduct(item),
        };
        products.value.unshift(product);
        const productsLS = JSON.parse(localStorage.getItem('myLibrary')) || [];
        productsLS.unshift(product);
        localStorage.setItem('myLibrary', JSON.stringify(productsLS));
    };
    const searchProducts = (inputValue) => {
        return inputValue.value
            ? products.value.filter((el) => el.name.toLowerCase().includes(inputValue.value.toLowerCase()))
            : products.value;
    };
    const removeProduct = (id) => {
        products.value = products.value.filter((item) => item?.id !== id);
        const productsLS = JSON.parse(localStorage.getItem('myLibrary'));
        localStorage.setItem('myLibrary', JSON.stringify(productsLS.filter((item) => item?.id !== id)));
    };
    const editProduct = (newItem, lastItem) => {
        const itemIndex = products.value.findIndex((el) => el?.id === lastItem.id);
        const updateItem = { id: products.value[itemIndex].id, ...formatProduct(newItem) };
        products.value[itemIndex] = updateItem;
        const productsLS = JSON.parse(localStorage.getItem('myLibrary'));
        const itemIndexLS = productsLS.findIndex((el) => el.id === lastItem.id);
        productsLS[itemIndexLS] = updateItem;
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
