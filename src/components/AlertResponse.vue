<script setup>
import { computed, ref, watch } from 'vue';
import { mdiDuck, mdiEmoticonHappy, mdiServer } from '@mdi/js';
import { useDisplay } from 'vuetify';

const { name } = useDisplay();

const props = defineProps({
    response: Object,
});

const isShow = ref(false);

const switchIsShow = () => {
    isShow.value = true;
    setTimeout(() => (isShow.value = false), 3000);
};

const isMobile = computed(() => {
    switch (name.value) {
        case 'xs':
        case 'sm':
        case 'md':
            return true;
        default:
            return false;
    }
});

watch(props, () => switchIsShow());
</script>

<template>
    <v-alert
        v-if="isShow"
        class="px-3 py-1 h-100"
        variant="outlined"
        density="compact"
        :icon="false"
        :type="props.response.status >= 400 ? 'error' : 'success'"
    >
        <v-alert-title class="text-sm-subtitle-2">
            <v-icon
                :icon="
                    props.response.status >= 500 ? mdiServer : props.response.status >= 400 ? mdiDuck : mdiEmoticonHappy
                "
                :size="isMobile ? 20 : 25"
            />
            <span
                v-if="!isMobile"
                class="ml-2"
            >
                {{
                    props.response.status >= 500
                        ? 'Ошибка на стороне сервера'
                        : props.response.status >= 400
                          ? 'Упс, что-то пошло не так'
                          : 'Готово'
                }}
            </span>
        </v-alert-title>
    </v-alert>
</template>

<!--<v-alert-->
<!--    v-if="isShow"-->
<!--    class="w-10 mx-auto mb-3 position-fixed right-0"-->
<!--    variant="outlined"-->
<!--    :icon="mdiDuck"-->
<!--    :title="-->
<!--        props.response.status >= 500-->
<!--            ? 'Ошибка на стороне сервера'-->
<!--            : props.response.status >= 300-->
<!--              ? 'Упс, что-то пошло не так'-->
<!--              : 'Дело сделано'-->
<!--    "-->
<!--    :type="props.response.status >= 500 ? 'error' : props.response.status >= 400 ? 'info' : 'success'"-->
<!--&gt;-->
<!--</v-alert>-->
