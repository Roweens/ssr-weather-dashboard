'use client';
import styles from './Header.module.scss';
import TwitterIcon from '@/../public/menu.svg';
import LocationIcon from '@/../public/location.svg';
import { Icon } from '../ui/Icon/Icon';
import { Text } from '../ui/Text/Text';
import { HStack } from '../ui/Stack';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { CountrySearch } from '../CountrySearch/CountrySearch';
import { useContext, useEffect, useState } from 'react';
import { LocationContext } from '@/lib/context/LocationContext/LocationContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;
    const [locationText, setLocationText] = useState('');
    const { location, error } = useContext(LocationContext);

    useEffect(() => {
        if (location || error) {
            setLocationText(
                (location
                    ? `${location.latitude}, ${location.longitude}`
                    : error) as string,
            );
        }
    }, [error, location]);

    return (
        <header className={styles.header}>
            <Icon Svg={TwitterIcon} size="s" buttonClassName={styles.icon} />
            <HStack gap="8">
                <Icon Svg={LocationIcon} size="s" />
                <Text text={locationText} bold />
            </HStack>
            <CountrySearch className={styles.search} />
            <HStack className={styles.switchers} gap="32">
                <LanguageSwitcher />
                <ThemeSwitcher />
            </HStack>
        </header>
    );
};
