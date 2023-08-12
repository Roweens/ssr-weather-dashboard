import { CityForecastResponse, TemperatureFormat } from '@/types/Forecast';
import { $api } from '../api';
import axios from 'axios';

interface FetchNearbyCitiesByLocationParams {
    lat?: number;
    lon?: number;
    units?: TemperatureFormat;
    count?: number;
}

export async function fetchNearbyCitiesByLocation(
    params: FetchNearbyCitiesByLocationParams,
) {
    const { lat, lon, units = 'metric', count = 2 } = params;

    if (!lat || !lon) {
        throw new Error();
    }

    try {
        const response = await $api.get<CityForecastResponse>(
            '/data/2.5/find',
            {
                params: {
                    lat,
                    lon,
                    units,
                    cnt: count,
                },
            },
        );

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
