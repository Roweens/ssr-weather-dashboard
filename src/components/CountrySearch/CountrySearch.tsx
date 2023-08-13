/* eslint-disable react/display-name */
'use client';

import { memo, useCallback, useContext, useState, useMemo } from 'react';
import classNames from 'classnames';
import SearchIcon from '@/../public/search.svg';
import { Combobox, ValueItem } from '../ui/Combobox/Combobox';
import { Icon } from '../ui/Icon/Icon';
import { LocationContext } from '@/lib/context/LocationContext/LocationContext';
import useLazyQuery from '@/lib/hooks/useLazyQuery/useLazyQuery';
import { CITY_SEARCH_QUERY_KEY } from '@/lib/const/queryKeys';
import { fetchCitiesByQuery } from '@/api/fetchCitiesByQuery/fetchCitiesByQuery';
import { City } from '@/types/Cities';
import { useTranslations } from 'next-intl';

interface CountrySearchProps {
    className?: string;
}

export const CountrySearch = memo((props: CountrySearchProps) => {
    const { className } = props;

    const [cityName, setCityName] = useState<string>('');
    const t = useTranslations('Header');

    const [trigger, { data: citiesArray = [] }] = useLazyQuery<
        City[] | undefined,
        string
    >(CITY_SEARCH_QUERY_KEY.concat([cityName]), () =>
        fetchCitiesByQuery({
            cityName,
        }),
    );

    const citiesNames = useMemo<ValueItem<string>[]>(() => {
        return citiesArray.map(({ name, lat, country }) => {
            return { id: lat, value: `${name}, ${country}` };
        });
    }, [citiesArray]);

    const { location, setLocation } = useContext(LocationContext);

    const onChange = useCallback(
        (value: ValueItem<string>) => {
            const cityName = value.value.split(',')[0];
            const currentCity = citiesArray.find(
                (city) => city.name === cityName && city.lat === value.id,
            );

            setLocation?.({
                latitude: currentCity?.lat,
                longitude: currentCity?.lon,
                name: currentCity?.name,
            });
        },
        [citiesArray, setLocation],
    );

    const onInputChange = useCallback(
        (value: string) => {
            setCityName(value);
            trigger();
        },
        [trigger],
    );

    return (
        <Combobox<string, ValueItem<string>>
            className={classNames('', {}, [className])}
            addonLeft={<Icon Svg={SearchIcon} stroke fill={false} />}
            onInputChange={onInputChange}
            onChange={onChange}
            values={citiesNames}
            inputValue={cityName}
            value={location}
            placeholder={t('search')}
        />
    );
});
