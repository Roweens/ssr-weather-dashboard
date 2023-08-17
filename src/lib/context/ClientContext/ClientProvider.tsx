'use client';

import { ReactNode, useEffect, useContext, useState } from 'react';
import { ClientContext } from './ClientContext';

interface ClientProviderProps {
    children: ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    return (
        <ClientContext.Provider value={{ isClient }}>
            {children}
        </ClientContext.Provider>
    );
};

export function useIsClient() {
    return useContext(ClientContext);
}
