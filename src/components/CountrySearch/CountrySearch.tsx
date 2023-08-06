import { memo } from 'react';
import classNames from 'classnames';
import SearchIcon from '@/../public/search.svg';
import { Combobox } from '../ui/Combobox/Combobox';
import { Icon } from '../ui/Icon/Icon';

interface CountrySearchProps {
    className?: string;
}

export const CountrySearch = memo((props: CountrySearchProps) => {
    const { className } = props;

    return (
        <Combobox
            className={classNames('', {}, [className])}
            addonLeft={<Icon Svg={SearchIcon} stroke fill={false} />}
        />
    );
});
