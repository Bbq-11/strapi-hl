<script setup>
import {
    mdiArrowLeftBoldCircleOutline,
    mdiArrowRightBoldCircleOutline,
    mdiBedEmpty,
    mdiCheck,
    mdiCheckboxBlankCircleOutline,
    mdiCheckboxMarkedCircleOutline,
    mdiCheckCircleOutline,
    mdiClose,
    mdiPencil,
} from '@mdi/js';
import { computed, ref } from 'vue';

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
        class="rounded-lg"
        variant="text"
        :prepend-icon="mdiPencil"
        :text="`${props.item.weight}`"
        @click="switchDialog"
    />
    <v-dialog v-model="dialog">
        <v-card
            class="mx-auto text-primary"
            elevation="18"
            width="400"
        >
            <v-card-title class="my-4 mx-auto font-weight-bold text-h5">
                {{ props.item.name }}
            </v-card-title>
            <v-card-text class="pt-0 pb-4 px-4">
                <v-text-field
                    class="mx-auto"
                    base-color="primary"
                    width="100px"
                    suffix="г"
                    maxlength="6"
                    autocomplete="off"
                    v-model="currentWeight"
                    :rules="[checkValidNumValues]"
                />
                <v-row
                    class="mt-2 justify-space-between align-center"
                    no-gutters
                >
                    <v-col>
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
