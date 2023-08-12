import { CSSProperties, memo } from 'react';

import classNames from 'classnames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { className, border, height, width } = props;

    const styles: CSSProperties = {
        height,
        width,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(cls.skeleton, {}, [className])}
            style={styles}
        ></div>
    );
});
