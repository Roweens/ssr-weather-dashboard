import { MULTIPLE_CITIES_QUERY_KEY } from '@/lib/const/queryKeys';
import { Hydrate } from '@/lib/utils/HydrateComponent';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { CityForecastContainer } from './CityForecastContainer';
import { fetchMultipleCitiesById } from '@/api/fetchMultipleCitiesById/fetchMultipleCitiesById';

export default async function CityForecastWrapper() {
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

    await queryClient.prefetchQuery(MULTIPLE_CITIES_QUERY_KEY, () =>
        fetchMultipleCitiesById({
            idsArray: [524901, 703448, 2643743],
        }),
    );
    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <CityForecastContainer />
        </Hydrate>
    );
}
