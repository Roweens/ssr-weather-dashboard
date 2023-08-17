import { LinkProps } from 'next/link';

export enum AppRoutes {
    DASHBOARD = 'Dashboard',
    MAP = 'Map',
}

export const RouteConfig: Record<AppRoutes, LinkProps> = {
    [AppRoutes.DASHBOARD]: {
        href: '/',
    },
    [AppRoutes.MAP]: {
        href: '/maps',
    },
};
