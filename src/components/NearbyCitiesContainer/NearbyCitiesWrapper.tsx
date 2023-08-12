import { NEARBY_CITIES_QUERY_KEY } from '@/lib/const/queryKeys';
import { Hydrate } from '@/lib/utils/HydrateComponent';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { NearbyCitiesContainer } from './NearbyCitiesContainer';
import { fetchNearbyCitiesByLocation } from '@/api/fetchNearbyCitiesByLocation/fetchNearbyCitiesByLocation';
import { defaultLocation } from '@/lib/const/defaultLocation';

export default async function NearbyCitiesWrapper() {
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

    await queryClient.prefetchQuery(NEARBY_CITIES_QUERY_KEY, () =>
        fetchNearbyCitiesByLocation({
            lat: defaultLocation.latitude,
            lon: defaultLocation.longitude,
        }),
    );
    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <NearbyCitiesContainer />
        </Hydrate>
    );
}
