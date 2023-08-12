/* eslint-disable react/display-name */
import { memo } from 'react';
import classNames from 'classnames';
import cls from './CityForecastList.module.scss';
import { VStack } from '../ui/Stack';
import { CityForecast } from '@/types/Forecast';
import { Text } from '../ui/Text/Text';
import { CityForecastItem } from '../CityForecastItem/CityForecastItem';

interface CityForecastListProps {
    className?: string;
    weatherArray?: CityForecast[];
    error?: unknown;
}

export const CityForecastList = memo((props: CityForecastListProps) => {
    const { className, weatherArray, error } = props;

    if (error) {
        return <Text title={'Something went wrong'} bold />;
    }

    return (
        <VStack
            className={classNames(cls.cityForecastList, {}, [className])}
            gap="16"
        >
            {weatherArray?.map((forecast) => (
                <CityForecastItem forecast={forecast} key={forecast.id} />
            ))}
        </VStack>
    );
});
