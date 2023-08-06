import { fetchForecastByLocation } from '@/api/fetchWeatherByLocation/fetchWeatherByLocation';
import { WEEK_FORECAST_QUERY_KEY } from '@/lib/const/queryKeys';
import { Hydrate } from '@/lib/utils/HydrateComponent';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { LocationForecastContainer } from './LocationForecastContainer';

const defaultLocation = {
    coords: {
        latitude: 36.778259,
        longitude: -119.417931,
    },
};

export default async function LocationForecastWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                retry: false,
            },
        },
    });

    await queryClient.prefetchQuery(WEEK_FORECAST_QUERY_KEY, () =>
        fetchForecastByLocation(defaultLocation as GeolocationPosition),
    );
    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <LocationForecastContainer />
        </Hydrate>
    );
}
