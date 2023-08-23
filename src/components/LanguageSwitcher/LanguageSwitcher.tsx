import { memo } from 'react';
import { TabItem, Tabs } from '../ui/Tabs/Tabs';
import { usePathname, useRouter } from 'next-intl/client';
import { Icon } from '../ui/Icon/Icon';
import RuIcon from '@/../public/ru.svg';
import UsaIcon from '@/../public/usa.svg';
import { useParams } from 'next/navigation';

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher = memo((props: LanguageSwitcherProps) => {
    const { className } = props;

    const pathname = usePathname();
    const router = useRouter();
    const { locale } = useParams();

    const TabItems: TabItem<'en' | 'ru'>[] = [
        {
            content: <Icon Svg={RuIcon} stroke fill={false} />,
            value: 'ru',
        },
        {
            content: <Icon Svg={UsaIcon} stroke fill={false} />,
            value: 'en',
        },
    ];

    const onLocaleSwitch = (locale: TabItem<'en' | 'ru'>) => {
        router.replace(pathname, { locale: locale.value });
    };

    return (
        <Tabs
            className={className}
            tabs={TabItems}
            value={locale as 'en' | 'ru'}
            onTabClick={onLocaleSwitch}
        />
    );
});

LanguageSwitcher.displayName = 'LanguageSwitcher';
export default LanguageSwitcher;
