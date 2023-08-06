'use client';

import { createContext } from 'react';

export interface LocationContextProps {
    location: GeolocationPosition | null;
    error: string | null;
    setLocation?: (location: GeolocationPosition) => void;
}

export const LocationContext = createContext<LocationContextProps>({
    location: null,
    error: null,
});
