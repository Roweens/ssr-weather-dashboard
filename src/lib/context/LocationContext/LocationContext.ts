'use client';

import { defaultLocation } from '@/lib/const/defaultLocation';
import { TemperatureFormat } from '@/types/Forecast';
import { createContext } from 'react';

export interface Location {
    latitude?: number;
    longitude?: number;
    name?: string;
}
export interface LocationContextProps {
    location: Location;
    format: TemperatureFormat;
    error: string | null;
    setLocation?: (location: Location) => void;
    setFormat?: (format: TemperatureFormat) => void;
}

export const LocationContext = createContext<LocationContextProps>({
    location: defaultLocation,
    error: null,
    format: 'metric',
});
