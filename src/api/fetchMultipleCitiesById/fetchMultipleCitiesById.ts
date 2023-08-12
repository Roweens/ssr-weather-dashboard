import { CityForecastResponse, TemperatureFormat } from '@/types/Forecast';
import { $api } from '../api';
import axios from 'axios';

interface FetchMultipleCitiesByIdParams {
    idsArray?: number[];
    units?: TemperatureFormat;
}

export async function fetchMultipleCitiesById(
    params: FetchMultipleCitiesByIdParams,
) {
    const { units = 'metric', idsArray } = params;

    if (!idsArray) {
        throw new Error();
    }

    try {
        const response = await $api.get<CityForecastResponse>(
            '/data/2.5/group',
            {
                params: {
                    id: idsArray.join(','),
                    units,
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
