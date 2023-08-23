'use client';
import styles from './Header.module.scss';
import TwitterIcon from '@/../public/menu.svg';
import LocationIcon from '@/../public/location.svg';
import { Icon } from '../ui/Icon/Icon';
import { Text } from '../ui/Text/Text';
import { HStack, VStack } from '../ui/Stack';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { CountrySearch } from '../CountrySearch/CountrySearch';
import { useCallback, useContext, useEffect, useState } from 'react';
import { LocationContext } from '@/lib/context/LocationContext/LocationContext';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { Default, Desktop } from '@/styles/media';
import { Drawer } from '../ui/Drawer/Drawer';
import AppLink from '../ui/AppLink/AppLink';
import { Card } from '../ui/Card/Card';
import { usePathname } from 'next/navigation';
import { RouteConfig } from '@/app/router/AppRoutes';

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;
    const [locationText, setLocationText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

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

    const onDrawerOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onDrawerClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const LocationInfo = (
        <HStack gap="8">
            <Icon Svg={LocationIcon} size="s" />
            <Text text={locationText} bold />
        </HStack>
    );

    const Switchers = (
        <HStack className={styles.switchers} gap="32">
            <LanguageSwitcher />
            <ThemeSwitcher />
        </HStack>
    );

    const DrawerContent = (
        <VStack fullHeight max gap="32" align="center">
            <Card padding="16">
                <VStack align="center" gap="16">
                    {LocationInfo}
                    {Switchers}
                </VStack>
            </Card>
            {Object.entries(RouteConfig).map(([name, props]) => {
                return (
                    <AppLink key={name} href={props.href}>
                        <Text text={name} />
                    </AppLink>
                );
            })}
        </VStack>
    );

    return (
        <>
            <header className={styles.header}>
                <Icon
                    Svg={TwitterIcon}
                    size="s"
                    buttonClassName={styles.icon}
                    interactive
                    onClick={onDrawerOpen}
                />
                <Desktop>{LocationInfo}</Desktop>
                <CountrySearch className={styles.search} />
                <Default>{Switchers}</Default>
            </header>
            <Drawer isOpen={isOpen} onClose={onDrawerClose}>
                {DrawerContent}
            </Drawer>
        </>
    );
};
