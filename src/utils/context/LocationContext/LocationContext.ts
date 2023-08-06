'use client';

import { createContext } from 'react';

export interface LocationContextProps {
    location?: string;
    setLocation?: (location: string) => void;
}

export const LocationContext = createContext<LocationContextProps>({});
