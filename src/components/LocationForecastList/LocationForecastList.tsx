import { memo } from 'react';
import classNames from 'classnames';
import cls from './LocationForecastList.module.scss';
import { HStack, VStack } from '../ui/Stack';
import { LocationForecastItem } from '../LocationForecastItem/LocationForecastItem';
import { Text } from '../ui/Text/Text';
import { ForecastType } from '@/types/Forecast';

interface LocationForecastListProps {
    className?: string;
    weatherArray?: ForecastType;
}

export const LocationForecastList = memo((props: LocationForecastListProps) => {
    const { className, weatherArray } = props;

    console.log(weatherArray);

    return (
        <VStack gap="32" wrap="wrap">
            <Text title="Next 7 days" bold size="xl" />
            <Text title={weatherArray?.city.name} bold size="xl" />
            <HStack
                className={classNames(cls.locationForecastList, {}, [
                    className,
                ])}
                gap="32"
            >
                {/* Change key !!!! */}
                {new Array(7).fill(0).map((forecast, i, array) => (
                    <LocationForecastItem forecast={forecast} key={i} />
                ))}
            </HStack>
        </VStack>
    );
});
