<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    response: Object,
});

const isShow = ref(false);

const switchIsShow = () => {
    isShow.value = true;
    setTimeout(() => (isShow.value = false), 3000);
};

watch(props, () => switchIsShow());
</script>

<template>
    <v-alert
        v-if="isShow"
        class="w-25 mx-auto mb-3"
        variant="outlined"
        :title="props.response.status < 400 ? 'Выполнено' : 'Ошибочка'"
        :type="props.response.status < 400 ? 'success' : 'error'"
    >
    </v-alert>
</template>
