import { memo } from 'react';
import classNames from 'classnames';
import cls from './Loader.module.scss';

interface LoadersProps {
    className?: string;
}

export const Loader = memo((props: LoadersProps) => {
    const { className } = props;

    return <span className={classNames(cls.loader, {}, [className])} />;
});
