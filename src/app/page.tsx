import styles from './page.module.scss';
import LocationForecastWrapper from '@/components/LocationForecastContainer/LocationForecastWrapper';
import { VStack } from '@/components/ui/Stack';
import RainProbChartWrapper from '@/components/RainProbChart/RainProbChartWrapper';

interface HomePagePageProps {
    className?: string;
}

export default function HomePage(props: HomePagePageProps) {
    return (
        <main className={styles.main}>
            <VStack gap="32" fullHeight>
                <LocationForecastWrapper />
                <RainProbChartWrapper />
            </VStack>
            <p>Country list</p>
        </main>
    );
}
