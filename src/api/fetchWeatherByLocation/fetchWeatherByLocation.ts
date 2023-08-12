import { ForecastType, TemperatureFormat } from '@/types/Forecast';
import { $api } from '../api';

interface FetchForecastByLocation {
    lat?: number;
    lon?: number;
    units?: TemperatureFormat;
}

export async function fetchForecastByLocation(params: FetchForecastByLocation) {
    const { lat, lon, units = 'metric' } = params;

    if (!lat || !lon) {
        throw new Error();
    }

    try {
        const response = await $api.get<ForecastType>('/data/2.5/forecast', {
            params: {
                lat,
                lon,
                units,
                appid: process.env.NEXT_PUBLIC_API_KEY,
            },
        });

        if (!response.data) throw new Error();
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
