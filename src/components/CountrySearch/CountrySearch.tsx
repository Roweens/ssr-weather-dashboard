import { ChangeEvent, memo, useCallback, useContext, useEffect } from 'react';
import classNames from 'classnames';
import SearchIcon from '@/../public/search.svg';
import { Combobox } from '../ui/Combobox/Combobox';
import { Icon } from '../ui/Icon/Icon';
import { LocationContext } from '@/utils/context/LocationContext/LocationContext';

interface CountrySearchProps {
    className?: string;
}

const locationsArray = ['Moscow', 'Berlin', 'Katowice', 'New York'];

export const CountrySearch = memo((props: CountrySearchProps) => {
    const { className } = props;

    const { location, setLocation } = useContext(LocationContext);

    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <Combobox
            className={classNames('', {}, [className])}
            addonLeft={<Icon Svg={SearchIcon} stroke fill={false} />}
            onChange={setLocation}
            values={locationsArray}
            value={location}
            placeholder="Search city..."
        />
    );
});
