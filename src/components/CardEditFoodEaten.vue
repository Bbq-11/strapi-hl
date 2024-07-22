<script setup>
import { mdiCheck, mdiClose, mdiPencil } from '@mdi/js';
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';

const props = defineProps({
    item: Object,
});

const { mobile } = useDisplay();
const isMobile = ref(mobile.value);
const dialog = ref(false);
const currentWeight = ref(props.item.weight);

const checkValidNumValues = (value) => /^([1-9][0-9]{0,3}(\.[0-9]{0,2})?|0\.[0-9]{0,2})$/.test(value);
const switchDialog = () => (dialog.value = !dialog.value);
const adding = () => {
    switchDialog();
    props.item.weight = currentWeight.value;
};

watch(
    () => mobile.value,
    () => (isMobile.value = mobile.value),
);
</script>

<template>
    <v-btn
        class="rounded-lg text-caption text-sm-subtitle-2 px-0 px-sm-4"
        variant="text"
        :prepend-icon="mdiPencil"
        :density="isMobile ? 'compact' : 'comfortable'"
        :text="`${props.item.weight}`"
        @click="switchDialog"
    />
    <v-dialog
        v-model="dialog"
        width="300px"
    >
        <v-card class="text-primary pa-2 pa-sm-4">
            <v-card-title class="mx-auto text-center w-75 text-h6 text-sm-h5 font-weight-bold pa-0 mb-4 mb-sm-6">
                {{ props.item.name }}
            </v-card-title>
            <v-card-text class="pa-0">
                <v-text-field
                    v-model="currentWeight"
                    class="mx-auto"
                    variant="underlined"
                    width="70px"
                    suffix="г"
                    maxlength="6"
                    autocomplete="off"
                    :rules="[checkValidNumValues]"
                >
                    <template #prepend-inner>
                        <v-icon
                            color="primary opacity-100"
                            size="20"
                            :icon="mdiPencil"
                        />
                    </template>
                </v-text-field>
                <v-row
                    class="justify-space-between align-end"
                    no-gutters
                >
                    <v-col cols="auto">
                        <VBtnCard
                            :size="40"
                            :icon="mdiClose"
                            @click="switchDialog"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <VBtnCard
                            :size="40"
                            :icon="mdiCheck"
                            :disabled="!checkValidNumValues(currentWeight)"
                            @click="adding"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
