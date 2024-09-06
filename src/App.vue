<script setup>
import { onMounted } from 'vue';
import { useProductStore } from './stores/Products.js';
import AppBar from './components/AppBar.vue';
import AlertResponse from './components/AlertResponse.vue';

const productStore = useProductStore();

onMounted(() => productStore.addProducts());
</script>

<template>
    <v-app>
        <v-layout class="user-select-hidden">
            <AppBar />
            <v-main>
                <v-container
                    class="mt-8 mt-sm-16 pa-0"
                    fluid
                >
                    <AlertResponse :response="productStore.res" />
                    <router-view />
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
</template>
