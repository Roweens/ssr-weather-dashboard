/* eslint-disable react/display-name */
'use client';

import { memo, useCallback, useContext, useMemo, useState } from 'react';
import classNames from 'classnames';
import { LocationForecastList } from '../LocationForecastList/LocationForecastList';
import { useQuery } from '@tanstack/react-query';
import { fetchForecastByLocation } from '@/api/fetchWeatherByLocation/fetchWeatherByLocation';
import { LocationContext } from '@/lib/context/LocationContext/LocationContext';
import { WEEK_FORECAST_QUERY_KEY } from '@/lib/const/queryKeys';
import { HStack, VStack } from '../ui/Stack';
import { Text } from '../ui/Text/Text';
import { Skeleton } from '../ui/Skeleton/Skeleton';
import { TemperatureFormat } from '@/types/Forecast';
import { TabItem, Tabs } from '../ui/Tabs/Tabs';

interface LocationForecastContainerProps {
    className?: string;
}

const formatOptions: TabItem<TemperatureFormat>[] = [
    {
        content: <Text text="Celcius" />,
        value: 'metric',
    },
    {
        content: <Text text="Fahrenheit" />,
        value: 'standard',
    },
];

export const LocationForecastContainer = memo(
    (props: LocationForecastContainerProps) => {
        const { className } = props;

        const [format, setFormat] = useState<TemperatureFormat>('metric');

        const { location } = useContext(LocationContext);

        const {
            data: weatherData,
            isLoading,
            error,
        } = useQuery(WEEK_FORECAST_QUERY_KEY.concat([location, format]), () =>
            fetchForecastByLocation({
                lat: location.latitude,
                lon: location.longitude,
                units: format,
            }),
        );

        const onFormatHandle = useCallback(
            (tab: TabItem<TemperatureFormat>) => {
                setFormat(tab.value);
            },
            [],
        );

        const weekForecastList = useMemo(
            () =>
                weatherData?.list.filter((data) =>
                    data.dt_txt.includes('12:00:00'),
                ),
            [weatherData?.list],
        );

        return (
            <VStack gap="16">
                <HStack gap="32" justify="between">
                    <HStack gap="16">
                        <Text title="Next 5 days:" size="xl" />
                        <Text title={weatherData?.city.name} bold size="xl" />
                    </HStack>
                    <Tabs
                        tabs={formatOptions}
                        onTabClick={onFormatHandle}
                        value={format}
                    />
                </HStack>

                {isLoading ? (
                    <HStack className={classNames('', {}, [])} gap="32">
                        <Skeleton height={300} width={330} border="1rem" />
                        <Skeleton height={280} width={150} border="1rem" />
                        <Skeleton height={280} width={150} border="1rem" />
                        <Skeleton height={280} width={150} border="1rem" />
                        <Skeleton height={280} width={150} border="1rem" />
                    </HStack>
                ) : (
                    <LocationForecastList
                        className={classNames('', {}, [className])}
                        weatherArray={weekForecastList}
                        error={error}
                    />
                )}
            </VStack>
        );
    },
);
