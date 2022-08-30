import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ChartData,
} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function CustomChart() {

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };



    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [23, 87, 23, 90, 78, 23, 23],
                backgroundColor: '#996dff',
            },
            {
                label: 'Dataset 2',
                data: [23, 87, 23, 90, 78, 23, 23].reverse(),
                backgroundColor: '#04d361',
            },
        ],
    };

    return (
        <Bar
            data={data}
            options={options}
        />
    )
}