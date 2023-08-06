import Image from 'next/image';
import styles from './page.module.scss';
import { LocationForecastList } from '@/components/LocationForecastList/LocationForecastList';

interface HomePagePageProps {
    className?: string;
}

export default function HomePage(props: HomePagePageProps) {
    return (
        <main className={styles.main}>
            <LocationForecastList />
        </main>
    );
}
