import { useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    ChartOptions,
    ChartType,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getCssVar } from '@/lib/utils/getCssVar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export interface ChartDataType<T extends any> {
    labels?: string[];
    data?: T[];
    dataLabel: string;
}

interface ChartProps<T extends any> {
    extendedOptions?: ChartOptions;
    data: ChartDataType<T>;
    type: ChartType;
    width?: number | string;
    height?: number | string;
}

export const Chart = <T extends any>(props: ChartProps<T>) => {
    const { type = 'bar', extendedOptions, data } = props;

    console.log(data);

    const options: ChartOptions<typeof type> = useMemo(() => {
        return {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Bar Chart',
                },
            },
            scales: {
                y: {
                    grid: {
                        color: getCssVar('--hint-color'),
                    },
                },
                x: {
                    grid: {
                        color: 'transparent',
                    },
                },
            },
            maintainAspectRatio: false,
            ...extendedOptions,
        };
    }, [extendedOptions]);

    const computedData = useMemo(() => {
        return {
            labels: data.labels,
            datasets: [
                {
                    label: data.dataLabel,
                    data: data?.data?.map((item) => item),
                    backgroundColor: getCssVar('--highlight-color'),
                },
            ],
        };
    }, [data?.data, data.dataLabel, data.labels]);

    return (
        <Bar
            // @ts-ignore
            options={options}
            data={computedData}
            width={'100%'}
            height={'100%'}
        />
    );
};
