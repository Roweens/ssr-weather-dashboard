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
import { getFullHour } from '@/lib/utils/getFullHour';
import { useTranslations } from 'next-intl';

interface LocationForecastItemProps {
    className?: string;
    forecast: DayForecast;
    fullview?: boolean;
    format?: TemperatureFormat;
    onClick?: (id: string) => void;
}

const LocationForecastItem = memo((props: LocationForecastItemProps) => {
    const {
        className,
        forecast,
        fullview = false,
        format = 'metric',
        onClick,
    } = props;

    const t = useTranslations('WeatherCard');

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

    const time = useMemo(() => getFullHour(forecast.dt_txt), [forecast.dt_txt]);

    const day = useMemo(
        () => getLongDay({ date: forecast.dt_txt }),
        [forecast.dt_txt],
    );

    const onClickHandle = useCallback(
        () => onClick?.(forecast.dt_txt),
        [forecast.dt_txt, onClick],
    );

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
                    <Text title={t(day)} className={styles.day} size="l" />
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
                    <Text title={t(day)} variant="inverted" bold size="l" />
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
                                title={t('realFeel', {
                                    temperature: formattedFeelsLike,
                                })}
                                size="m"
                                variant="inverted"
                            />
                            <Text
                                title={t('pressure', {
                                    pressure: forecast.main.pressure,
                                })}
                                size="m"
                                variant="inverted"
                            />
                            <Text
                                title={t('humidity', {
                                    humidity: forecast.main.humidity,
                                })}
                                size="m"
                                variant="inverted"
                            />
                        </VStack>
                        <VStack align="end">
                            <Text
                                title={t('clouds', {
                                    clouds: forecast.clouds.all,
                                })}
                                size="m"
                                variant="inverted"
                            />
                            <Text
                                title={t('windSpeed', {
                                    speed: forecast.wind.speed,
                                })}
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

LocationForecastItem.displayName = 'LocationForecastItem';
export default LocationForecastItem;
