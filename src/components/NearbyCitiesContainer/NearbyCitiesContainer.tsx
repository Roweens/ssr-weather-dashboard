'use client';

import { memo, useContext, useMemo } from 'react';
import classNames from 'classnames';
import styles from './NearbyCitiesContainer.module.scss';
import { CityForecastList } from '../CityForecastList/CityForecastList';
import { NEARBY_CITIES_QUERY_KEY } from '@/lib/const/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { VStack } from '../ui/Stack';
import { Text } from '../ui/Text/Text';
import { Skeleton } from '../ui/Skeleton/Skeleton';
import { fetchNearbyCitiesByLocation } from '@/api/fetchNearbyCitiesByLocation/fetchNearbyCitiesByLocation';
import { LocationContext } from '@/lib/context/LocationContext/LocationContext';
import { useTranslations } from 'next-intl';

interface NearbyCitiesContainerProps {
    className?: string;
}

export const NearbyCitiesContainer = memo(
    (props: NearbyCitiesContainerProps) => {
        const { className } = props;

        const { location, format } = useContext(LocationContext);
        const t = useTranslations('NearbyCities');

        const {
            data: nearbyCitiesWeatherData,
            isLoading,
            error,
        } = useQuery(NEARBY_CITIES_QUERY_KEY.concat([location, format]), () =>
            fetchNearbyCitiesByLocation({
                lat: location.latitude,
                lon: location.longitude,
                units: format,
            }),
        );

        const filteredNearbyCities = useMemo(
            () =>
                nearbyCitiesWeatherData?.list.filter(
                    (city) => city.name !== location.name,
                ),
            [location.name, nearbyCitiesWeatherData?.list],
        );

        return (
            <VStack gap="16" className={'lg:mx-8'} max>
                <Text title={t('title')} size="xl" bold />

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
                            styles.nearbyCitiesContainer,
                            {},
                            [className],
                        )}
                        weatherArray={filteredNearbyCities}
                        error={error}
                    />
                )}
            </VStack>
        );
    },
);

NearbyCitiesContainer.displayName = 'NearbyCitiesContainer';
export default NearbyCitiesContainer;
