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
                appid: process.env.NEXT_PUBLIC_API_KEY,
            },
        });

        if (!response.data) throw new Error();
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
