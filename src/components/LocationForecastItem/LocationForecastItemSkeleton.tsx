import { memo } from 'react';
import classNames from 'classnames';
import cls from './LocationForecastItemSkeleton.module.scss';

interface LocationForecastItemSkeletonProps {
  className?: string;
}

export const LocationForecastItemSkeleton = memo((props: LocationForecastItemSkeletonProps) => {
  const { className } = props;


  return (
    <div className={classNames(cls.locationForecastItemSkeleton, {}, [className])}>
      
    </div>
 );
})