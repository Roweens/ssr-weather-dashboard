'use client';

import { createContext } from 'react';

export interface ClientContextProps {
    isClient: boolean;
}

export const ClientContext = createContext<ClientContextProps>({
    isClient: false,
});
