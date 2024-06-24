<template>
    <!--    {{ props.lst }}-->
    <!--    <br />-->
    <Bar
        :data="chartData"
        :options="chartOptions"
    />
    <!--    {{ props.lst }}-->
    <!--    {{ data }}-->
</template>

<script setup>
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js/auto';
import { useCalendarStore } from '../stores/Calendar.js';

const calendarStore = useCalendarStore();

const props = defineProps({
    lst: Object,
});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const chartData = computed(() => ({
    labels: props.lst.map((item) => item.date),
    datasets: [
        {
            label: 'Data',
            data: props.lst.map((item) => item.calories),
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
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
