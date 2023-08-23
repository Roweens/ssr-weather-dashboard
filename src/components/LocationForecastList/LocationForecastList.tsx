import { memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import cls from './LocationForecastList.module.scss';
import { HStack } from '../ui/Stack';
import { DayForecast } from '@/types/Forecast';
import LocationForecastItem from '../LocationForecastItem/LocationForecastItem';
import { Text } from '../ui/Text/Text';
import { useTranslations } from 'next-intl';

interface LocationForecastListProps {
    className?: string;
    weatherArray?: DayForecast[];
    error?: unknown;
}

export const LocationForecastList = memo((props: LocationForecastListProps) => {
    const { className, weatherArray, error } = props;

    const [selectedItemId, setSelectedItemId] = useState(
        weatherArray?.[0].dt_txt,
    );

    const t = useTranslations('ForecastList');

    const onCardClickHandle = useCallback((id: string) => {
        setSelectedItemId(id);
    }, []);

    if (error) {
        return <Text title={t('error')} bold />;
    }

    return (
        <HStack
            className={classNames(cls.locationForecastList, {}, [className])}
            gap="32"
        >
            {weatherArray?.map((forecast) => (
                <LocationForecastItem
                    forecast={forecast}
                    key={forecast.dt}
                    fullview={selectedItemId === forecast.dt_txt}
                    onClick={onCardClickHandle}
                />
            ))}
        </HStack>
    );
});

LocationForecastList.displayName = 'LocationForecastList';
export default LocationForecastList;
