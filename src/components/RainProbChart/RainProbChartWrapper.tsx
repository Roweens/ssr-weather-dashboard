import { fetchForecastByLocation } from '@/api/fetchWeatherByLocation/fetchWeatherByLocation';
import { WEEK_FORECAST_QUERY_KEY } from '@/lib/const/queryKeys';
import { Hydrate } from '@/lib/utils/HydrateComponent';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { RainProbChart } from './RainProbChart';
import { defaultLocation } from '@/lib/const/defaultLocation';

export default async function RainProbChartWrapper() {
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
        fetchForecastByLocation({
            lat: defaultLocation.latitude,
            lon: defaultLocation.longitude,
        }),
    );
    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <RainProbChart />
        </Hydrate>
    );
}
