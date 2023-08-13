'use client';

import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
    Location,
    LocationContext,
    LocationContextProps,
} from './LocationContext';
import { useGeolocation } from '@/lib/hooks/useGeolocation/useGeolocation';
import { defaultLocation } from '@/lib/const/defaultLocation';
import { TemperatureFormat } from '@/types/Forecast';

interface LocationProviderProps {
    children: ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [format, setFormat] = useState<TemperatureFormat>('metric');

    const successCallback = useCallback((position: GeolocationPosition) => {
        setLocation({
            latitude: position?.coords.latitude,
            longitude: position?.coords.longitude,
        });
    }, []);

    const [geolocation, error] = useGeolocation({
        successCallback,
    });

    const defaultProps = useMemo(
        () => ({
            location: location ? location : defaultLocation,
            format,
            error,
            setLocation,
            setFormat,
        }),
        [error, format, location],
    );

    return (
        <LocationContext.Provider value={defaultProps as LocationContextProps}>
            {children}
        </LocationContext.Provider>
    );
};
