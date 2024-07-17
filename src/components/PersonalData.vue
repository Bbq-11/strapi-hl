<script setup>
import { computed, ref, watch } from 'vue';
import CardEditPersonalData from './CardEditPersonalData.vue';
import { usePersonStore } from '../stores/Person.js';

const personStore = usePersonStore();

const getAgeString = computed(() => {
    if (!personStore.person.age) return null;
    if (personStore.person.age % 10 === 1 && personStore.person.age % 100 !== 11)
        return `${personStore.person.age} год`;
    else if (
        personStore.person.age % 10 >= 2 &&
        personStore.person.age % 10 <= 4 &&
        (personStore.person.age % 100 < 10 || personStore.person.age % 100 >= 20)
    )
        return `${personStore.person.age} года`;
    return `${personStore.person.age} лет`;
});
</script>

<template>
    <v-card class="mx-auto mb-12 mb-lg-8 text-primary">
        <v-card-text class="py-6 pa-lg-8">
            <v-row
                class="text-center align-center justify-space-between ga-2 ga-sm-6 text-subtitle-2 text-sm-subtitle-1"
                no-gutters
            >
                <v-col
                    cols="12"
                    md="4"
                    lg="5"
                >
                    <v-row
                        class="justify-space-between"
                        no-gutters
                    >
                        <v-col cols="auto">
                            {{ personStore.person.sex || 'Пол' }}
                        </v-col>
                        <v-col cols="auto">
                            {{ getAgeString || 'Возвраст' }}
                        </v-col>
                        <v-col cols="auto">
                            {{ personStore.person.height || 'Рост' }}
                            <span class="text-caption text-sm-body-2"> (см)</span>
                        </v-col>
                        <v-col cols="auto">
                            {{ personStore.person.weight || 'Вес' }}
                            <span class="text-caption text-sm-body-2"> (кг)</span>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col
                    cols="12"
                    md="7"
                    lg="6"
                >
                    <v-row
                        class="justify-center align-center ga-6"
                        justify-sm="space-between"
                        no-gutters
                    >
                        <v-col
                            class="d-flex flex-column"
                            cols="12"
                            sm="auto"
                        >
                            {{ personStore.person.activity || '-' }}
                            <span class="text-caption text-sm-body-2">уровень активности</span>
                        </v-col>
                        <v-col sm="6">
                            <v-row
                                class="justify-space-between align-center"
                                no-gutters
                            >
                                <v-col
                                    class="d-flex flex-column"
                                    cols="auto"
                                >
                                    <p v-if="personStore.person.isActive">
                                        {{ `${Math.floor(personStore.getStandard)} ккал` }}
                                    </p>
                                    <p v-else>-</p>
                                    <span class="text-caption text-sm-body-2">суточная норма</span>
                                </v-col>
                                <v-col cols="auto">
                                    <CardEditPersonalData />
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
