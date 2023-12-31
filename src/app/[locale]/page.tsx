import styles from './page.module.scss';

import LocationForecastWrapper from '@/components/LocationForecastContainer/LocationForecastWrapper';
import { VStack } from '@/components/ui/Stack';
import RainProbChartWrapper from '@/components/RainProbChart/RainProbChartWrapper';
import CityForecastWrapper from '@/components/CityForecastContainer/CityForecastWrapper';
import NearbyCitiesWrapper from '@/components/NearbyCitiesContainer/NearbyCitiesWrapper';

export default function HomePage() {
    return (
        <main className={styles.main}>
            <VStack gap="32" fullHeight>
                <LocationForecastWrapper />
                <RainProbChartWrapper />
            </VStack>
            <div className={styles.listsWrapper}>
                <CityForecastWrapper />
                <NearbyCitiesWrapper />
            </div>
        </main>
    );
}
