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

const theme = useTheme();
const props = defineProps({
    lst: Object,
    type: String,
});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = computed(() => ({
    labels: props.lst.map((item) => item.date),
    datasets: [
        {
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
            labels: {
                font: {
                    size: 16, // размер шрифта
                },
                color: '#bbad84',
                usePointStyle: true, // использовать стиль точки для метки
            },
        },

        tooltip: {
            callbacks: {
                label: (context) => {
                    const index = context.dataIndex;
                    const description = chartData.value.datasets[0].description[index];
                    return `каллории: ${description.calories}\n
                    proteins: ${description.proteins}\n
                    fats: ${description.fats}\n
                    carbs: ${description.carbs}\n`;
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
