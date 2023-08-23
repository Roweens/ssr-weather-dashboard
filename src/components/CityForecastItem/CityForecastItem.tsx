import { memo, useMemo } from 'react';
import classNames from 'classnames';
import cls from './CityForecastItem.module.scss';
import { CityForecast, TemperatureFormat } from '@/types/Forecast';
import { HStack, VStack } from '../ui/Stack';
import Image from 'next/image';
import { Text } from '../ui/Text/Text';
import { getFormattedTemperature } from '@/lib/utils/getFormattedTemperature';
import { Card } from '../ui/Card/Card';

interface CityForecastItemProps {
    forecast: CityForecast;
    format?: TemperatureFormat;
    className?: string;
}

const CityForecastItem = memo((props: CityForecastItemProps) => {
    const { className, forecast, format = 'metric' } = props;

    const formattedTemperature = useMemo(
        () =>
            getFormattedTemperature({
                weather: forecast.main.temp,
                format,
            }),
        [forecast.main.temp, format],
    );

    return (
        <Card
            className={classNames(cls.cityForecastItem, {}, [className])}
            variant="light"
            fullWidth
        >
            <HStack max justify="between" align="center">
                <VStack gap="16" justify="center">
                    <VStack>
                        <Text
                            title={forecast.sys.country}
                            size="l"
                            variant="accent"
                        />
                        <Text title={forecast.name} size="xl" bold />
                    </VStack>
                    <Text title={forecast.weather[0].main} size="l" />
                </VStack>
                <VStack align="center">
                    <Image
                        src={`https://openweathermap.org/img/wn/${forecast?.weather[0].icon}@2x.png`}
                        alt="weather icon"
                        width={100}
                        height={100}
                    />
                    <Text
                        title={formattedTemperature}
                        size="xl"
                        bold
                        align="center"
                    />
                </VStack>
            </HStack>
        </Card>
    );
});

CityForecastItem.displayName = 'CityForecastItem';
export default CityForecastItem;
