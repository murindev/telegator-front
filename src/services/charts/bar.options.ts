export default {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            padding: {
                bottom: 75,
            },
            text: 'Демография аудитории канала',
            align: 'start',
            color: '#191643',
            font: {
                family: "'Source Sans Pro'",
                size: 14,
                weight: 'normal',
            },
        },
    },
    scales: {
        x: {
            stacked: true,
            grid: {
                display: false,
                borderWidth: 0,
            },
            ticks: {
                padding: 0,
                color: '#BDBDBD',
                font: {
                    family: "'Source Sans Pro'",
                    size: 14,
                },
                callback(t: any, i: any) {
                    return t < 0 ? Math.abs(t) : t;
                },
            },
        },
        y: {
            stacked: true,
            grid: {
                borderWidth: 0,
            },
            ticks: {
                padding: 0,
                color: '#BDBDBD',
                font: {
                    family: "'Source Sans Pro'",
                    size: 14,
                },
            },
        },
    },

}
