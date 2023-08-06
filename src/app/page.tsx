import Image from 'next/image';
import styles from './page.module.scss';

interface HomePagePageProps {
    className?: string;
}

export default function HomePage(props: HomePagePageProps) {
    return <main className={styles.main}>Main page</main>;
}
