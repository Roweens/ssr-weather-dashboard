import styles from './page.module.scss';
import LocationForecastWrapper from '@/components/LocationForecastContainer/LocationForecastWrapper';

interface HomePagePageProps {
    className?: string;
}

export default function HomePage(props: HomePagePageProps) {
    return (
        <main className={styles.main}>
            <LocationForecastWrapper />
        </main>
    );
}
