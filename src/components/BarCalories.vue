<template>
    <v-sheet
        class="bg-transparent mb-4 mb-sm-8"
        height="320px"
    >
        <Bar
            :data="chartData"
            :options="chartOptions"
        />
    </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js/auto';
import { useTheme } from 'vuetify';
import { usePersonStore } from '../stores/Person.js';

const props = defineProps({
    listData: Object,
});

const theme = useTheme();
const personStore = usePersonStore();

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = computed(() => ({
    labels: props.listData.map((item) => item.date),
    datasets: [
        {
            label: 'Норма',
            data: props.listData.map((item) => Math.floor(personStore.getStandard * (item.count || 1))),
            type: 'line',
            pointRadius: 5,
            borderWidth: 4,
            borderColor: theme.global.name.value === 'dark' ? '#649cc0' : '#D1C4E9',
            pointBorderColor: 'transparent',
            pointBackgroundColor: props.listData.map((item) =>
                item.calories >= personStore.getStandard * (item.count || 1) ? '#1fda1f' : '#c9314e',
            ),
            backgroundColor: 'transparent',
            description: props.listData.map((item) => Math.floor(personStore.getStandard * (item.count || 1))),
        },
        {
            type: 'bar',
            label: 'Ккал',
            data: props.listData.map((item) => item.calories),
            backgroundColor: theme.global.name.value === 'dark' ? '#FFECB3' : '#1A237E',
            borderColor: '#bbad84',
            borderWidth: 1,
            description: props.listData,
        },
    ],
}));

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            onClick: () => {},
            position: 'bottom',
            labels: {
                display: true,
                font: {
                    size: 16,
                },
                boxPadding: 200,
                color: '#bbad84',
            },
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const index = context.dataIndex;
                    const descriptionBar = chartData.value.datasets[1].description[index];
                    const descriptionLine = chartData.value.datasets[0].description[index];
                    if (context.dataset.type === 'bar') {
                        return `Ккал: ${descriptionBar.calories}\n
                    Белки: ${descriptionBar.proteins}\n
                    Жиры: ${descriptionBar.fats}\n
                    Углеводы: ${descriptionBar.carbs}\n`;
                    } else {
                        return `Ккал: ${descriptionLine}`;
                    }
                },
            },
        },
    },
    scales: {
        x: {
            grid: {
                color: '#bbad84',
            },
            ticks: {
                color: '#bbad84',
            },
        },
        y: {
            grid: {
                color: '#bbad84',
            },
            ticks: {
                color: '#bbad84',
            },
        },
    },
});
</script>
