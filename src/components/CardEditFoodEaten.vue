<script setup>
import { mdiCheck, mdiClose, mdiPencil } from '@mdi/js';
import { ref } from 'vue';

const props = defineProps({
    item: Object,
});

const dialog = ref(false);
const currentWeight = ref(props.item.weight);

const checkValidNumValues = (value) => /^([1-9][0-9]{0,3}(\.[0-9]{0,2})?|0\.[0-9]{0,2})$/.test(value);
const switchDialog = () => (dialog.value = !dialog.value);
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
        v-model="dialog"
        class="elevation-16"
        width="400px"
        scrim="primary"
    >
        <v-card class="text-primary pa-4">
            <v-card-title
                class="mx-auto text-center w-75 text-primary text-h6 text-sm-h5 font-weight-bold pa-0 mb-4 mb-sm-6"
            >
                {{ props.item.name }}
            </v-card-title>
            <v-card-text class="pa-0">
                <v-text-field
                    v-model="currentWeight"
                    class="mx-auto text-subtitle-1"
                    base-color="primary"
                    width="100px"
                    suffix="г"
                    maxlength="6"
                    autocomplete="off"
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
                                size="30"
                                :icon="mdiClose"
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
                                size="30"
                                :icon="mdiCheck"
                            />
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
