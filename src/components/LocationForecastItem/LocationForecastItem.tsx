import { ReactElement, memo } from 'react';
import classNames from 'classnames';
import styles from './LocationForecastItem.module.scss';
import { ForecastView } from '@/types/Forecast';
import { Text } from '../ui/Text/Text';
import TestIcon from '@/../public/menu.svg';
import { HStack, VStack } from '../ui/Stack';
import { Icon } from '../ui/Icon/Icon';
import { Card } from '../ui/Card/Card';

interface LocationForecastItemProps {
    className?: string;
    forecast?: string;
    view?: ForecastView;
}

const mapWeatherToIcon: Record<string, ReactElement> = {};

export const LocationForecastItem = memo((props: LocationForecastItemProps) => {
    const { className, forecast, view = 'detailed' } = props;

    // const Icon = mapWeatherToIcon[forecast.weather]

    if (view === 'short') {
        return (
            <Card variant="light" padding="24">
                <VStack
                    className={classNames(styles.locationForecastItem, {}, [className])}
                    gap="32"
                    align="center"
                >
                    <Text title="Saturday" className={styles.day} size="l" />
                    <Icon Svg={TestIcon} />
                    <Text title="10C" size="xl" bold />
                </VStack>
            </Card>
        );
    }

    return (
        <Card variant="highlighted" padding="0">
            <VStack className={classNames(styles.locationForecastItem, {}, [className])} gap="16">
                <HStack max justify="between" gap="32" className={styles.cardHeader}>
                    <Text title="Saturday" variant="inverted" bold size="l" />
                    <Text title="11:00 PM" variant="inverted" bold size="l" />
                </HStack>
                <VStack max className={styles.cardBody} gap="16">
                    <HStack max justify="between">
                        <Text title="10C" size="xxl" bold variant="inverted" />
                        <Icon Svg={TestIcon} />
                    </HStack>
                    <HStack max justify="between" align="end">
                        <VStack>
                            <Text title="info" size="m" variant="inverted" />
                            <Text title="info" size="m" variant="inverted" />
                            <Text title="info" size="m" variant="inverted" />
                            <Text title="info" size="m" variant="inverted" />
                        </VStack>
                        <VStack>
                            <Text title="info" size="m" variant="inverted" />
                            <Text title="info" size="m" variant="inverted" />
                        </VStack>
                    </HStack>
                </VStack>
            </VStack>
        </Card>
    );
});

// <HStack max justify="between" align="start" className={styles.cardBody}>
//     <VStack gap="8">
//         <Text title="10C" size="xxl" bold variant="inverted" />
//         <VStack>
//             <Text title="info" size="m" variant="inverted" />
//             <Text title="info" size="m" variant="inverted" />
//             <Text title="info" size="m" variant="inverted" />
//             <Text title="info" size="m" variant="inverted" />
//         </VStack>
//     </VStack>
//     <VStack fullHeight gap="8">
//         <Icon Svg={TestIcon} />
//         <VStack>
//             <Text title="info" size="m" variant="inverted" />
//             <Text title="info" size="m" variant="inverted" />
//         </VStack>
//     </VStack>
// </HStack>
