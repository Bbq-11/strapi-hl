<template>
    <v-sheet
        class="bg-transparent"
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

const props = defineProps({
    listData: Object,
});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const theme = useTheme();

const listTitles = ['Белки', 'Жиры', 'Углеводы'];

const getListData = (property) => props.listData.map((item) => item[property]);
const chartData = computed(() => ({
    labels: props.listData.map((item) => item.date),
    datasets: [
        {
            type: 'bar',
            label: listTitles[0],
            data: getListData('proteins'),
            backgroundColor: theme.global.name.value === 'dark' ? '#c4c26e' : '#288dcc',
            borderColor: '#bbad84',
            borderWidth: 1,
            description: getListData('proteins'),
        },
        {
            type: 'bar',
            label: listTitles[1],
            data: getListData('fats'),
            backgroundColor: theme.global.name.value === 'dark' ? '#7c7b44' : '#1e6191',
            borderColor: '#bbad84',
            borderWidth: 1,
            description: getListData('fats'),
        },
        {
            type: 'bar',
            label: listTitles[2],
            data: getListData('carbs'),
            backgroundColor: theme.global.name.value === 'dark' ? '#5b5b33' : '#123a52',
            borderColor: '#bbad84',
            borderWidth: 1,
            description: getListData('carbs'),
        },
    ],
}));

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                display: true,
                font: {
                    size: 16,
                },
                color: '#bbad84',
            },
        },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const datasetIndex = context.datasetIndex;
                    const index = context.dataIndex;
                    return `${listTitles[datasetIndex]}: ${chartData.value.datasets[datasetIndex].description[index]} (г)`;
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
