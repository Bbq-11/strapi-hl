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
import { usePersonStore } from '../stores/Person.js';

const theme = useTheme();
const personStore = usePersonStore();
const props = defineProps({
    lst: Object,
    type: String,
});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = computed(() => ({
    labels: props.lst.map((item) => item.date),
    datasets: [
        {
            label: 'Норма',
            data: props.lst.map((item) => Math.floor(personStore.getStandard * (item.count || 1))),
            color: '#f30230',
            borderColor: '#3e95cd',
            borderWidth: 2,
            backgroundColor: '#f30230',
            type: 'line',
            pointRadius: 4,
            description: props.lst.map((item) => Math.floor(personStore.getStandard * (item.count || 1))),
        },
        {
            type: 'bar',
            label: props.type,
            color: '#bbad84',
            data: props.lst.map((item) => item.calories),
            backgroundColor: theme.global.name.value === 'dark' ? '#FFECB3' : '#1A237E',
            borderColor: 'transparent',
            borderWidth: 2,
            description: props.lst,
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
            padding: {
                top: 100,
            },
            labels: {
                display: true,
                font: {
                    size: 16,
                },
                boxPadding: 200,
                color: '#bbad84',
                usePointStyle: true,
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
