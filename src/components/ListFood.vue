<script setup>
import { mdiClose } from '@mdi/js';
</script>

<template>
    <v-row
        class="gc-16 mb-4 align-center"
        no-gutters
    >
        <v-col class="text-h5 border-lg"> Творог</v-col>
        <v-col cols="auto">
            <v-text-field
                width="100px"
                variant="outlined"
                hideDetails="auto"
                density="compact"
                autocomplete="off"
                suffix="г."
            >
            </v-text-field>
        </v-col>
        <v-col cols="auto">
            <v-btn
                :icon="mdiClose"
                color="error"
                variant="tonal"
            />
        </v-col>
    </v-row>
    <v-row
        class="mr-10"
        no-gutters
    >
        <v-col>Бел</v-col>
        <v-col>Жир</v-col>
        <v-col class="mr-4">Угл</v-col>
        <v-col>Калл</v-col>
    </v-row>
</template>

<style scoped></style>
