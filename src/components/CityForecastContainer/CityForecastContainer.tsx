/* eslint-disable react/display-name */
'use client';

import { memo } from 'react';
import classNames from 'classnames';
import styles from './CityForecastContainer.module.scss';
import { CityForecastList } from '../CityForecastList/CityForecastList';
import { fetchMultipleCitiesById } from '@/api/fetchMultipleCitiesById/fetchMultipleCitiesById';
import { MULTIPLE_CITIES_QUERY_KEY } from '@/lib/const/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { VStack } from '../ui/Stack';
import { Text } from '../ui/Text/Text';
import { Skeleton } from '../ui/Skeleton/Skeleton';

interface CityForecastContainerProps {
    className?: string;
}

export const CityForecastContainer = memo(
    (props: CityForecastContainerProps) => {
        const { className } = props;

        const {
            data: cityWeatherData,
            isLoading,
            error,
        } = useQuery(MULTIPLE_CITIES_QUERY_KEY, () =>
            fetchMultipleCitiesById({
                idsArray: [524901, 703448, 2643743],
            }),
        );

        return (
            <VStack gap="16" className={'mx-8'} max>
                <Text title="Other large cities" size="xl" bold />

                {isLoading ? (
                    <VStack className={classNames('', {}, [])} gap="16">
                        <Skeleton height={168} width={600} border="1rem" />
                        <Skeleton height={168} width={600} border="1rem" />
                        <Skeleton height={168} width={600} border="1rem" />
                        <Skeleton height={168} width={600} border="1rem" />
                        <Skeleton height={168} width={600} border="1rem" />
                    </VStack>
                ) : (
                    <CityForecastList
                        className={classNames(
                            styles.cityForecastContainer,
                            {},
                            [className],
                        )}
                        weatherArray={cityWeatherData?.list}
                        error={error}
                    />
                )}
            </VStack>
        );
    },
);
