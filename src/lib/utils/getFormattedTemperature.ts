import { TemperatureFormat } from '@/types/Forecast';

const mapFormatToSymbol: Record<TemperatureFormat, string> = {
    standard: 'ºF',
    metric: 'ºC',
};

interface GetFormattedTemperature {
    weather: number;
    format?: TemperatureFormat;
}

export function getFormattedTemperature({
    weather,
    format = 'metric',
}: GetFormattedTemperature) {
    return `${String(Math.floor(weather))}${mapFormatToSymbol[format]}`;
}
