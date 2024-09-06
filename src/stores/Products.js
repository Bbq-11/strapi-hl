import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('productStore', () => {
    const products = ref([]);

    const res = ref({});

    const formatProduct = (item) => {
        return {
            name: item.name,
            calories: Number(String(item.calories).match(/\d+/)),
            proteins: Number(String(item.proteins).match(/\d+/)),
            fats: Number(String(item.fats).match(/\d+/)),
            carbs: Number(String(item.carbs).match(/\d+/)),
            privateID: String(item.privateID),
        };
    };

    const addProducts = async () => {
        const dbProducts = await getDatabaseProducts();
        const personalProducts = await getPersonalProducts();
        products.value = [...personalProducts, ...dbProducts].map((product) => formatProduct(product));
    };

    const addProduct = async (item) => {
        try {
            const product = {
                ...formatProduct(item),
                privateID: String(Date.now()),
            };
            res.value = await postPersonalProduct(product);
            products.value.unshift(product);
        } catch (e) {
            res.value = e;
        }
    };
    const removeProduct = async (id) => {
        try {
            res.value = await deletePersonalProduct(id);
            products.value = products.value.filter((item) => item?.privateID !== id);
        } catch (e) {
            res.value = e;
        }
    };
    const editProduct = async (newItem, lastItem) => {
        try {
            res.value = await updatePersonalProduct(lastItem);
            const itemIndex = products.value.findIndex((el) => el?.privateID === lastItem.privateID);
            const updateItem = { ...formatProduct(newItem), privateID: products.value[itemIndex].privateID };
            products.value[itemIndex] = updateItem;
            res.value = await updatePersonalProduct(updateItem);
        } catch (e) {
            res.value = e;
        }
    };
    const searchProducts = (inputValue) => {
        return inputValue.value
            ? products.value.filter((el) => el.name.toLowerCase().includes(inputValue.value.toLowerCase()))
            : products.value;
    };

    const getDatabaseProducts = async () => {
        return await axios
            .get(`http://localhost:1337/api/products`)
            .then((response) => response.data.data)
            .catch((error) => error);
    };
    const getPersonalProducts = async () => {
        return await axios
            .get(`http://localhost:1337/api/personal-products`)
            .then((response) => response.data.data)
            .catch((error) => error);
    };
    const postPersonalProduct = (product) => {
        return axios
            .post(
                'http://localhost:1337/api/personal-products',
                {
                    data: {
                        ...product,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => response)
            .catch((error) => error);
    };
    const deletePersonalProduct = (productId) => {
        return axios
            .delete(`http://localhost:1337/api/personal-products/${productId}`)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw new Error(error);
            });
    };
    const updatePersonalProduct = (product) => {
        return axios
            .put(`http://localhost:1337/api/personal-products/${product.privateID}`, { data: product })
            .then((response) => response)
            .catch((error) => error);
    };

    return {
        products,
        res,
        addProducts,
        addProduct,
        searchProducts,
        removeProduct,
        editProduct,
        getDatabaseProducts,
        getPersonalProducts,
        postPersonalProduct,
        deletePersonalProduct,
        updatePersonalProduct,
    };
});
