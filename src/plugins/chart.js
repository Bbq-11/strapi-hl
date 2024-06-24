export default {
    getChartType(chartType) {
        return chartType || 'bar';
    },
    getChartData(labels, datasets) {
        return {
            labels: labels,
            datasets: datasets,
        };
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'My Chart',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: false,
                grid: {
                    display: true,
                    color: 'rgba(0,0,0,0.1)',
                },
                ticks: {
                    color: 'rgba(0,0,0,0.5)',
                },
            },
            y: {
                stacked: false,
                grid: {
                    display: true,
                    color: 'rgba(0,0,0,0.1)',
                },
                ticks: {
                    color: 'rgba(0,0,0,0.5)',
                    callback: function (value) {
                        return value.toFixed(2);
                    },
                },
            },
        },
    },
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
};
