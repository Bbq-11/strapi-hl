<script setup>
import { mdiCheck, mdiClose, mdiPencil } from '@mdi/js';
import { ref } from 'vue';

const props = defineProps({
    item: Object,
});
const currentWeight = ref(props.item.weight);

const checkValidNumValues = (value) => {
    return /^([1-9][0-9]{0,3}(\.[0-9]{0,2})?|0\.[0-9]{0,2})$/.test(value);
};

const dialog = ref(false);
const switchDialog = () => {
    dialog.value = !dialog.value;
};

const adding = () => {
    switchDialog();
    props.item.weight = currentWeight.value;
};
</script>

<template>
    <v-btn
        class="rounded-lg text-subtitle-2"
        variant="text"
        :prepend-icon="mdiPencil"
        :text="`${props.item.weight}`"
        @click="switchDialog"
    />
    <v-dialog
        class="elevation-16"
        width="400px"
        scrim="primary"
        v-model="dialog"
    >
        <v-card class="text-primary pa-4 text-subtitle-1">
            <v-card-title class="mb-4 text-h5 w-75 mx-auto">
                {{ props.item.name }}
            </v-card-title>
            <v-card-text class="pa-0">
                <v-text-field
                    class="mx-auto text-subtitle-1"
                    base-color="primary"
                    width="100px"
                    suffix="г"
                    maxlength="6"
                    autocomplete="off"
                    v-model="currentWeight"
                    :rules="[checkValidNumValues]"
                />
                <v-row
                    class="justify-space-between align-center"
                    no-gutters
                >
                    <v-col cols="auto">
                        <v-btn
                            variant="text"
                            @click="switchDialog"
                        >
                            <v-icon
                                :icon="mdiClose"
                                size="30"
                            />
                        </v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            variant="text"
                            :disabled="!checkValidNumValues(currentWeight)"
                            @click="adding"
                        >
                            <v-icon
                                :icon="mdiCheck"
                                size="30"
                            />
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
