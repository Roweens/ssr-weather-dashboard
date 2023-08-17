import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter, Roboto_Flex } from 'next/font/google';
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';
import { Header } from '@/components/Header/Header';
import { LocationProvider } from '@/lib/context/LocationContext/LocationProvider';
import { ThemeProvider } from '@/lib/context/ThemeContext/ThemeProvider';
import QueryProvider from '@/lib/providers/QueryProvider';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ClientProvider } from '@/lib/context/ClientContext/ClientProvider';

const inter = Inter({ subsets: ['latin'] });
const robotoFlex = Roboto_Flex({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-flex',
});

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_PRODUCTION_URL || 'http://localhost:3000',
    ),
    title: 'Roweens Weather',
    description: 'Weather dashboard project by Roweens',
    robots: {
        index: true,
        follow: true,
        nocache: true,
    },
    referrer: 'origin',
    openGraph: {
        title: 'Roweens Weather',
        description: 'Weather dashboard project by Roweens',
        url: process.env.NEXT_PUBLIC_PRODUCTION_URL,
        siteName: 'RoweensWeather',
        locale: 'en_US',
        type: 'website',
    },
    creator: 'Roweens',
    publisher: 'Vercel',
};

interface RootLayoutProps {
    children: ReactNode;
    params: {
        locale: string;
    };
}

export default async function RootLayout({
    children,
    params,
}: RootLayoutProps) {
    let messages;
    try {
        messages = (await import(`../../../messages/${params.locale}.json`))
            .default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={params.locale}>
            <body className={`${inter.className} ${robotoFlex.variable} app`}>
                <NextIntlClientProvider
                    locale={params.locale}
                    messages={messages}
                >
                    <QueryProvider>
                        <ThemeProvider>
                            <ClientProvider>
                                <LocationProvider>
                                    <MainLayout header={<Header />}>
                                        {children}
                                    </MainLayout>
                                </LocationProvider>
                            </ClientProvider>
                        </ThemeProvider>
                    </QueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
