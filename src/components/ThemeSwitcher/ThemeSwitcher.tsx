'use client';

import { memo, useCallback } from 'react';
import classNames from 'classnames';
import cls from './ThemeSwitcher.module.scss';
import SunIcon from '@/../public/sun.svg';
import MoonIcon from '@/../public/moon.svg';
import { Icon } from '../ui/Icon/Icon';
import { useTheme } from '@/utils/hooks/useTheme/useTheme';
import { TabItem, Tabs } from '../ui/Tabs/Tabs';

interface ThemeSwitcherProps {
    className?: string;
}

const TabItems: TabItem<'dark' | 'light'>[] = [
    {
        content: <Icon Svg={MoonIcon} stroke fill={false} />,
        value: 'dark',
    },
    { content: <Icon Svg={SunIcon} stroke fill={false} />, value: 'light' },
];

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const { className } = props;

    const { toggleTheme, theme } = useTheme();

    const onThemeSwitchHandle = useCallback(() => {
        toggleTheme();
    }, [toggleTheme]);

    return (
        <Tabs
            className={className}
            tabs={TabItems}
            onTabClick={onThemeSwitchHandle}
            value="light"
        />
    );
});
