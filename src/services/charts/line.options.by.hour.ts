export default {
    layout: {
        padding: 0
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
    tension: 1,
    scales: {
        x: {
            grid: {
                display: false,
                borderWidth: 0,
            },
            ticks: {
                padding: 20,
                color: '#BDBDBD',
                font: {
                    family: "'Source Sans Pro'",
                    size: 14,
                },
            },
        },
        y: {
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
