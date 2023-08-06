import { memo } from 'react';
import classNames from 'classnames';
import cls from './LocationForecastList.module.scss';
import { HStack, VStack } from '../ui/Stack';
import { LocationForecastItem } from '../LocationForecastItem/LocationForecastItem';
import { Text } from '../ui/Text';

interface LocationForecastListProps {
    className?: string;
    weatherArray?: string[];
}

export const LocationForecastList = memo((props: LocationForecastListProps) => {
    const { className, weatherArray } = props;

    return (
        <VStack>
            <Text text="Next 7 days" />
            <HStack className={classNames(cls.locationForecastList, {}, [className])}>
                {weatherArray?.map((forecast) => (
                    <LocationForecastItem forecast={forecast} />
                ))}
            </HStack>
        </VStack>
    );
});
