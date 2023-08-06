'use client';
import styles from './Header.module.scss';
import TwitterIcon from '@/../public/menu.svg';
import LocationIcon from '@/../public/location.svg';
import { Icon } from '../ui/Icon/Icon';
import { Text } from '../ui/Text/Text';
import classNames from 'classnames';
import { HStack } from '../ui/Stack';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { CountrySearch } from '../CountrySearch/CountrySearch';
import { Card } from '../ui/Card/Card';

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;

    // const location = useGeolocation();

    return (
        <header className={styles.header}>
            <Icon Svg={TwitterIcon} size="s" interactive buttonClassName={styles.icon} />
            <HStack gap="8">
                <Icon Svg={LocationIcon} size="s" interactive />
                <Text text="Moscow, Russia" bold />
            </HStack>
            <CountrySearch className={styles.search} />
            <ThemeSwitcher className={styles.themeSwitcher} />
        </header>
    );
};
