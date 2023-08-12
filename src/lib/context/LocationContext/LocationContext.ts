'use client';

import { defaultLocation } from '@/lib/const/defaultLocation';
import { createContext } from 'react';

export interface Location {
    latitude?: number;
    longitude?: number;
    name?: string;
}
export interface LocationContextProps {
    location: Location;
    error: string | null;
    setLocation?: (location: Location) => void;
}

export const LocationContext = createContext<LocationContextProps>({
    location: defaultLocation,
    error: null,
});
