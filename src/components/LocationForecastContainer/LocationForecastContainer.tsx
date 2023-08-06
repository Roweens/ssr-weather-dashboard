'use client';

import { memo, useContext } from 'react';
import classNames from 'classnames';
import { LocationForecastList } from '../LocationForecastList/LocationForecastList';
import { useQuery } from '@tanstack/react-query';
import { fetchForecastByLocation } from '@/api/fetchWeatherByLocation/fetchWeatherByLocation';
import { LocationContext } from '@/lib/context/LocationContext/LocationContext';
import { WEEK_FORECAST_QUERY_KEY } from '@/lib/const/queryKeys';

interface LocationForecastContainerProps {
    className?: string;
}

export const LocationForecastContainer = memo(
    (props: LocationForecastContainerProps) => {
        const { className } = props;

        const { location } = useContext(LocationContext);

        const { data } = useQuery(WEEK_FORECAST_QUERY_KEY, () =>
            fetchForecastByLocation(location),
        );

        return (
            <LocationForecastList
                className={classNames('', {}, [className])}
                weatherArray={data}
            />
        );
    },
);
