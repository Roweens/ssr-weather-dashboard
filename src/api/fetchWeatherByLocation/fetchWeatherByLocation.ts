import { ForecastType, TemperatureFormat } from '@/types/Forecast';
import { $api } from '../api';
import axios from 'axios';

interface FetchForecastByLocationParams {
    lat?: number;
    lon?: number;
    units?: TemperatureFormat;
}

export async function fetchForecastByLocation(
    params: FetchForecastByLocationParams,
) {
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
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
        } else {
            console.log('unexpected error: ', error);
        }
    }
}
