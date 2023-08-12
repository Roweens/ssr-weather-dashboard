/* eslint-disable react/display-name */
import { memo, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import styles from './LocationForecastItem.module.scss';
import { DayForecast, TemperatureFormat } from '@/types/Forecast';
import { Text } from '../ui/Text/Text';
import { HStack, VStack } from '../ui/Stack';
import { Card } from '../ui/Card/Card';
import Image from 'next/image';
import { getLongDay } from '@/lib/utils/getLongDay';
import { getFormattedTemperature } from '@/lib/utils/getFormattedTemperature';

interface LocationForecastItemProps {
    className?: string;
    forecast: DayForecast;
    fullview?: boolean;
    format?: TemperatureFormat;
    onClick?: (id: string) => void;
}

export const LocationForecastItem = memo((props: LocationForecastItemProps) => {
    const {
        className,
        forecast,
        fullview = false,
        format = 'metric',
        onClick,
    } = props;

    const formattedFeelsLike = useMemo(
        () =>
            getFormattedTemperature({
                weather: forecast.main.feels_like,
                format,
            }),
        [forecast.main.feels_like, format],
    );

    const formattedTemperature = useMemo(
        () =>
            getFormattedTemperature({
                weather: forecast.main.temp,
                format,
            }),
        [forecast.main.temp, format],
    );

    const time = useMemo(
        () => `${new Date(forecast.dt_txt).getHours()}:00`,
        [forecast.dt_txt],
    );

    const day = useMemo(
        () => getLongDay({ date: forecast.dt_txt }),
        [forecast.dt_txt],
    );

    const onClickHandle = useCallback(() => {
        onClick?.(forecast.dt_txt);
    }, [forecast.dt_txt, onClick]);

    if (fullview === false) {
        return (
            <Card variant="light" padding="24" onClick={onClickHandle}>
                <VStack
                    className={classNames(styles.locationForecastItem, {}, [
                        className,
                    ])}
                    gap="32"
                    align="center"
                >
                    <Text title={day} className={styles.day} size="l" />
                    <Image
                        src={`https://openweathermap.org/img/wn/${forecast?.weather[0].icon}@2x.png`}
                        alt="weather icon"
                        width={100}
                        height={100}
                    />
                    <Text title={formattedTemperature} size="xl" bold />
                </VStack>
            </Card>
        );
    }

    return (
        <Card variant="highlighted" padding="0">
            <VStack
                className={classNames(styles.locationForecastItem, {}, [
                    className,
                ])}
                gap="16"
            >
                <HStack
                    max
                    justify="between"
                    gap="32"
                    className={styles.cardHeader}
                >
                    <Text title={day} variant="inverted" bold size="l" />
                    <Text title={time} variant="inverted" bold size="l" />
                </HStack>
                <VStack max className={styles.cardBody} gap="16">
                    <HStack max justify="between">
                        <Text
                            title={formattedTemperature}
                            size="xxl"
                            bold
                            variant="inverted"
                        />
                        <Image
                            src={`https://openweathermap.org/img/wn/${forecast?.weather[0].icon}@2x.png`}
                            alt="weather icon"
                            width={100}
                            height={100}
                        />
                    </HStack>
                    <HStack max justify="between" align="end">
                        <VStack>
                            <Text
                                title={`Real Feel: ${formattedFeelsLike}`}
                                size="m"
                                variant="inverted"
                            />
                            <Text
                                title={`Pressure: ${forecast.main.pressure}MB`}
                                size="m"
                                variant="inverted"
                            />
                            <Text
                                title={`Humidity: ${forecast.main.humidity}%`}
                                size="m"
                                variant="inverted"
                            />
                        </VStack>
                        <VStack align="end">
                            <Text
                                title={`Clouds: ${forecast.clouds.all}`}
                                size="m"
                                variant="inverted"
                            />
                            <Text
                                title={`Wind Speed: ${forecast.wind.speed} km/h `}
                                size="m"
                                variant="inverted"
                            />
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
