import { ForecastType } from '@/types/Forecast';
import { $api } from '../api';

export async function fetchForecastByLocation(
    location?: GeolocationPosition | null,
) {
    if (!location) {
        throw new Error();
    }

    try {
        const response = await $api.get<ForecastType>('/data/2.5/forecast', {
            params: {
                lat: location.coords.latitude,
                lon: location.coords.longitude,
                appid: process.env.NEXT_PUBLIC_API_KEY,
            },
        });

        if (!response.data) throw new Error();
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
