import { memo, ChangeEvent, useState, ReactNode } from 'react';
import { Combobox as ComboboxComponent } from '@headlessui/react';
import styles from './Combobox.module.scss';
import CheckedIcon from '@/../public/check.svg';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';

interface ComboboxProps<T extends string> {
    className?: string;
    values: T[];
    value: T;
    placeholder?: string;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

const people = [
    'Durward Reynolds',
    'Kenton Towne',
    'Therese Wunsch',
    'Benedict Kessler',
    'Katelyn Rohan',
];

export const Combobox = <T extends string>(props: ComboboxProps<T>) => {
    const { className, value, values, placeholder, addonLeft, addonRight } = props;

    const [selectedPerson, setSelectedPerson] = useState(people[0]);
    const [query, setQuery] = useState('');

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) => {
                  return person.toLowerCase().includes(query.toLowerCase());
              });

    return (
        <ComboboxComponent
            value={selectedPerson}
            onChange={setSelectedPerson}
            as="div"
            className={classNames(styles.wrapper, {}, [className])}
        >
            {({ open }) => (
                <>
                    {addonLeft && (
                        <div
                            className={classNames(styles.addon, { [styles.activeAddon]: open }, [])}
                        >
                            {addonLeft}
                        </div>
                    )}
                    <ComboboxComponent.Input
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setQuery(event.target.value)
                        }
                        className={classNames(
                            styles.input,
                            {
                                [styles.activeInput]: open,
                                [styles.withAddonRight]: Boolean(addonRight),
                                [styles.withAddonLeft]: Boolean(addonLeft),
                            },
                            []
                        )}
                    />
                    {addonRight && (
                        <div
                            className={classNames(styles.addon, { [styles.activeAddon]: open }, [])}
                        >
                            {addonRight}
                        </div>
                    )}
                    <ComboboxComponent.Options className={styles.list}>
                        {filteredPeople.map((person) => (
                            <ComboboxComponent.Option
                                key={person}
                                value={person}
                                className={styles.optionWrapper}
                                as="div"
                            >
                                {({ active, selected }) => (
                                    <li
                                        className={classNames(
                                            styles.option,
                                            {
                                                [styles.activeOption]: active,
                                            },
                                            []
                                        )}
                                    >
                                        {selected && (
                                            <Icon Svg={CheckedIcon} fill={false} stroke size="s" />
                                        )}
                                        {person}
                                    </li>
                                )}
                            </ComboboxComponent.Option>
                        ))}
                    </ComboboxComponent.Options>
                </>
            )}
        </ComboboxComponent>
    );
};
