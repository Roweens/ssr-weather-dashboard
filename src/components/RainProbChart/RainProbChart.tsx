/* eslint-disable react/display-name */
'use client';

import { memo, useContext } from 'react';
import classNames from 'classnames';
import cls from './RainProbChart.module.scss';
import { WEEK_FORECAST_QUERY_KEY } from '@/lib/const/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { fetchForecastByLocation } from '@/api/fetchWeatherByLocation/fetchWeatherByLocation';
import { LocationContext } from '@/lib/context/LocationContext/LocationContext';
import { Chart, ChartDataType } from '../ui/Chart/Chart';
import { ChartOptions } from 'chart.js';
import { Loader } from '../ui/Loader/Loader';
import { getLongDay } from '@/lib/utils/getLongDay';
import { Text } from '../ui/Text/Text';
import { VStack } from '../ui/Stack';
import { Skeleton } from '../ui/Skeleton/Skeleton';

interface RainProbChartProps {
    className?: string;
}

const options: ChartOptions<'bar'> = {
    plugins: {
        title: {
            display: false,
            text: 'Rain volume for 3 hours (mm)',
        },
    },
};

export const RainProbChart = memo((props: RainProbChartProps) => {
    const { className } = props;

    const { location } = useContext(LocationContext);

    const {
        data: weatherData,
        isLoading,
        error,
    } = useQuery(WEEK_FORECAST_QUERY_KEY.concat([location]), () =>
        fetchForecastByLocation({
            lat: location.latitude,
            lon: location.longitude,
        }),
    );

    const data: ChartDataType<number> = {
        labels: weatherData?.list
            .filter((forecast) => forecast.rain)
            .map((forecast) => {
                let day = getLongDay({ date: forecast.dt_txt });
                let hours = new Date(forecast.dt_txt).getHours();
                let minutes: string | number = new Date(
                    forecast.dt_txt,
                ).getMinutes();
                if (String(minutes).length === 1) {
                    minutes = `${String(minutes)}0`;
                }
                return `${day}, ${hours}:${minutes}`;
            }),
        data: weatherData?.list
            .filter((forecast) => forecast.rain)
            .map((forecast) => forecast?.rain?.['3h']),
        dataLabel: 'Rain volume',
    };

    return (
        <VStack fullHeight max gap="24">
            <Text title="Rain volume in millimeters" bold size="xl" />
            <div className={classNames(cls.rainProbChart, {}, [className])}>
                {isLoading ? (
                    <Skeleton width="100%" height="100%" />
                ) : (
                    <Chart<number>
                        data={data}
                        type="bar"
                        extendedOptions={options}
                    />
                )}
            </div>
        </VStack>
    );
});
