import { FC, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import cls from './Card.module.scss';
import { Mods } from '@/types/Mods';

export type CardVariant = 'dark' | 'light';
export type CardPadding = '0' | '8' | '16' | '24' | '32';
export type CardBorder = 'round' | 'normal' | 'intermediate';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    fullWidth?: boolean;
    fullHeight?: boolean;
    variant?: CardVariant;
    padding?: CardPadding;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
    '32': 'gap_32',
};

export const Card = (props: CardProps) => {
    const {
        className,
        children,
        fullWidth,
        fullHeight,
        variant = 'dark',
        padding = '8',
        border = 'normal',
        ...otherProps
    } = props;

    const paddingClass = mapPaddingToClass[padding];

    const mods: Mods = {
        [cls.fullHeight]: fullHeight,
        [cls.fullWidth]: fullWidth,
    };

    return (
        <div
            className={classNames(cls.card, mods, [
                className,
                cls[paddingClass],
                cls[border],
                cls[variant],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
