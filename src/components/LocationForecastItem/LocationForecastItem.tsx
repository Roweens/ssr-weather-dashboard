import { memo } from 'react';

import classNames from 'classnames';
import cls from './LocationForecastItem.module.scss';

interface LocationForecastItemProps {
    className?: string;
    forecast?: string;
}

export const LocationForecastItem = memo((props: LocationForecastItemProps) => {
    const { className } = props;

    return <div className={classNames(cls.locationForecastItem, {}, [className])}></div>;
});
