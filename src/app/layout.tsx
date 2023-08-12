import '../styles/globals.scss';
import type { Metadata } from 'next';
import { Inter, Roboto_Flex } from 'next/font/google';
import { MainLayout } from '@/components/layouts/MainLayout/MainLayout';
import { Header } from '@/components/Header/Header';
import { LocationProvider } from '@/lib/context/LocationContext/LocationProvider';
import { ThemeProvider } from '@/lib/context/ThemeContext/ThemeProvider';
import QueryProvider from '@/lib/providers/QueryProvider';

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${robotoFlex.variable} app`}>
                <QueryProvider>
                    <ThemeProvider>
                        <LocationProvider>
                            <MainLayout header={<Header />}>
                                {children}
                            </MainLayout>
                        </LocationProvider>
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
