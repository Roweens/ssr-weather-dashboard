/* eslint-disable react/display-name */
'use client';

import { memo, useCallback, useContext, useState, useMemo } from 'react';
import classNames from 'classnames';
import SearchIcon from '@/../public/search.svg';
import { Combobox } from '../ui/Combobox/Combobox';
import { Icon } from '../ui/Icon/Icon';
import { LocationContext } from '@/lib/context/LocationContext/LocationContext';
import useLazyQuery from '@/lib/hooks/useLazyQuery/useLazyQuery';
import { CITY_SEARCH_QUERY_KEY } from '@/lib/const/queryKeys';
import { fetchCitiesByQuery } from '@/api/fetchCitiesByQuery/fetchCitiesByQuery';
import { City } from '@/types/Cities';

interface CountrySearchProps {
    className?: string;
}

const locationsArray = ['Moscow', 'Berlin', 'Katowice', 'New York'];

export const CountrySearch = memo((props: CountrySearchProps) => {
    const { className } = props;

    const [cityName, setCityName] = useState<string>('');

    const [trigger, { data: citiesArray = [] }] = useLazyQuery<
        City[] | undefined,
        string
    >(CITY_SEARCH_QUERY_KEY.concat([cityName]), () =>
        fetchCitiesByQuery({
            cityName,
        }),
    );

    const citiesNames = useMemo(() => {
        console.log(citiesArray);
        return citiesArray.map(({ name }) => name);
    }, [citiesArray]);

    const { location, setLocation } = useContext(LocationContext);

    const onInputChange = useCallback(
        (value: string) => {
            setCityName(value);
            trigger();
        },
        [trigger],
    );

    return (
        <Combobox
            className={classNames('', {}, [className])}
            addonLeft={<Icon Svg={SearchIcon} stroke fill={false} />}
            onInputChange={onInputChange}
            onChange={setLocation}
            values={citiesNames}
            inputValue={cityName}
            value={location}
            placeholder="Search city..."
        />
    );
});
