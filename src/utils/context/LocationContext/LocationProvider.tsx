'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LocationContext } from './LocationContext';

interface LocationProviderProps {
    children: ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
    const [location, setLocation] = useState<string>('');

    const defaultProps = useMemo(
        () => ({
            location,
            setLocation,
        }),
        [location]
    );

    return <LocationContext.Provider value={defaultProps}>{children}</LocationContext.Provider>;
};
