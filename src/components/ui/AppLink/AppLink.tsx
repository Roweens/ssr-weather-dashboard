/* eslint-disable react/display-name */
import { memo, ReactNode } from 'react';
import classNames from 'classnames';
import cls from './AppLink.module.scss';
import Link, { LinkProps } from 'next/link';

interface AppLinkProps extends LinkProps {
    className?: string;
    children: ReactNode;
    activeClassname?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
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
