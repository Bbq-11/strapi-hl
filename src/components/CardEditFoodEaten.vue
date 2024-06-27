<script setup>
import {
    mdiArrowLeftBoldCircleOutline,
    mdiArrowRightBoldCircleOutline,
    mdiBedEmpty,
    mdiCheckboxBlankCircleOutline,
    mdiCheckboxMarkedCircleOutline,
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
    <!--    <v-icon-->
    <!--        class="mr-2"-->
    <!--        size="20"-->
    <!--        @click="switchDialog"-->
    <!--    >-->
    <!--        {{ mdiPencil }}-->
    <!--    </v-icon>-->
    <v-btn
        variant="text"
        rounded="lg"
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
            <v-card-title class="mt-4 mx-auto font-weight-bold text-h5">
                {{ props.item.name }}
            </v-card-title>
            <v-card-text class="pt-0">
                <v-text-field
                    class="mx-auto"
                    variant="underlined"
                    color="transparent"
                    base-color="transparent"
                    bg-color="transparent"
                    width="60px"
                    suffix="г"
                    v-model="currentWeight"
                    :rules="[checkValidNumValues]"
                    maxlength="6"
                    autocomplete="off"
                />
                <v-row
                    class="mt-4"
                    no-gutters
                    justify="space-between"
                    align="center"
                >
                    <v-col cols="auto">
                        <v-btn
                            class="text-surface bg-primary"
                            text="Отмена"
                            variant="outlined"
                            @click="switchDialog"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <v-btn
                            class="text-surface bg-primary"
                            variant="outlined"
                            text="Редактировать"
                            :disabled="!checkValidNumValues(currentWeight)"
                            @click="adding"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>
