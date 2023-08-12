import axios from 'axios';
import { $api } from '../api';
import { City } from '@/types/Cities';

interface FetchCitiesByQueryParams {
    cityName?: string;
    limit?: number;
}

export async function fetchCitiesByQuery(params: FetchCitiesByQueryParams) {
    const { cityName, limit = 6 } = params;

    try {
        const response = await $api.get<City[]>('/geo/1.0/direct', {
            params: {
                q: cityName,
                limit,
            },
        });

        if (!response.data) throw new Error();
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);

            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}
