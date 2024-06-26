<template>
    <div class="chart-container">
        <Bar
            :data="chartData"
            :options="chartOptions"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js/auto';

const props = defineProps({
    lst: Object,
});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = computed(() => ({
    labels: props.lst.map((item) => item.date),
    datasets: [
        {
            label: 'Циферки',
            data: props.lst.map((item) => item.calories),
            backgroundColor: 'rgb(255,0,0)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            description: props.lst,
        },
    ],
}));

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
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
});
</script>
