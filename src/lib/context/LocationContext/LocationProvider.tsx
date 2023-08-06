'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LocationContext } from './LocationContext';
import { useGeolocation } from '@/lib/hooks/useGeolocation/useGeolocation';

interface LocationProviderProps {
    children: ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
    const [location, setLocation] = useState<GeolocationPosition | null>(null);

    const [geolocation, error] = useGeolocation({
        successCallback: setLocation,
    });

    const defaultProps = useMemo(
        () => ({
            location,
            error: '',
            setLocation,
        }),
        [location],
    );

    return (
        <LocationContext.Provider value={defaultProps}>
            {children}
        </LocationContext.Provider>
    );
};
