import { memo } from 'react';
import classNames from 'classnames';
import styles from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent' | 'inverted';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l' | 'xl' | 'xxl';

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const mapSizeToClass: Record<TextSize, string> = {
    s: styles.size_s,
    m: styles.size_m,
    l: styles.size_l,
    xl: styles.size_xl,
    xxl: styles.size_xxl,
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h5',
    m: 'h4',
    l: 'h3',
    xl: 'h2',
    xxl: 'h1',
};

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    variant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
    'data-testid'?: string;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold = false,
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const additionalClasses = [
        className,
        styles[variant],
        styles[align],
        sizeClass,
    ];

    return (
        <div
            className={classNames(
                styles.text,
                { [styles.bold]: bold },
                additionalClasses,
            )}
        >
            {title && (
                <HeaderTag
                    className={styles.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={styles.text} data-testid={`${dataTestId}.Text`}>
                    {text}
                </p>
            )}
        </div>
    );
});
