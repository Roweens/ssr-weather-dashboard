import { memo } from 'react';
import classNames from 'classnames';
import cls from './LocationForecastList.module.scss';
import { HStack, VStack } from '../ui/Stack';
import { LocationForecastItem } from '../LocationForecastItem/LocationForecastItem';
import { Text } from '../ui/Text/Text';

interface LocationForecastListProps {
    className?: string;
    weatherArray?: string[];
}

export const LocationForecastList = memo((props: LocationForecastListProps) => {
    const { className, weatherArray } = props;

    return (
        <VStack gap="32" wrap="wrap">
            <Text title="Next 7 days" bold size="xl" />
            <HStack className={classNames(cls.locationForecastList, {}, [className])} gap="32">
                {new Array(7).fill(0).map((forecast) => (
                    <LocationForecastItem forecast={forecast} />
                ))}
            </HStack>
        </VStack>
    );
});
