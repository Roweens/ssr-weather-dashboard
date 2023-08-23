import { memo, ReactNode } from 'react';
import classNames from 'classnames';
import cls from './AppLink.module.scss';
import Link, { LinkProps } from 'next/link';

interface AppLinkProps extends LinkProps {
    className?: string;
    children: ReactNode;
    activeClassname?: string;
}

const AppLink = memo((props: AppLinkProps) => {
    const {
        className,
        children,
        href,
        activeClassname = '',
        ...others
    } = props;

    return (
        <Link
            href={href}
            className={classNames(cls.appLink, {}, [className])}
            {...others}
        >
            {children}
        </Link>
    );
});

AppLink.displayName = 'AppLink';
export default AppLink;
