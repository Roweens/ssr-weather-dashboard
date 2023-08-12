import { ChangeEvent, useState, ReactNode } from 'react';
import { Combobox as ComboboxComponent } from '@headlessui/react';
import styles from './Combobox.module.scss';
import CheckedIcon from '@/../public/check.svg';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

export interface ValueItem<T extends string> {
    id: number | string;
    value: T;
}

interface ComboboxProps<T extends string, S extends any> {
    className?: string;
    values: ValueItem<T>[];
    value?: S;
    inputValue: string;
    onInputChange?: (value: string) => void;
    onChange?: (value: S) => void;
    placeholder?: string;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Combobox = <T extends string, S extends any>(
    props: ComboboxProps<T, S>,
) => {
    const {
        className,
        value,
        inputValue,
        values,
        placeholder,
        onChange,
        onInputChange,
        addonLeft,
        addonRight,
    } = props;

    const onChangeHandler = (value: S) => {
        onChange?.(value);
    };

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onInputChange?.(e.target.value);
    };

    const filteredValues =
        inputValue === ''
            ? values
            : values?.filter((item) => {
                  return item.value
                      .toLowerCase()
                      .includes(inputValue.toLowerCase());
              });

    return (
        <ComboboxComponent
            value={value}
            onChange={onChangeHandler}
            as="div"
            className={classNames(styles.wrapper, {}, [className])}
        >
            {({ open }) => (
                <>
                    {addonLeft && (
                        <div
                            className={classNames(
                                styles.addon,
                                { [styles.activeAddon]: open },
                                [],
                            )}
                        >
                            {addonLeft}
                        </div>
                    )}
                    <ComboboxComponent.Input
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={onInputChangeHandler}
                        className={classNames(
                            styles.input,
                            {
                                [styles.activeInput]: open,
                                [styles.withAddonRight]: Boolean(addonRight),
                                [styles.withAddonLeft]: Boolean(addonLeft),
                            },
                            [],
                        )}
                    />
                    {addonRight && (
                        <div
                            className={classNames(
                                styles.addon,
                                { [styles.activeAddon]: open },
                                [],
                            )}
                        >
                            {addonRight}
                        </div>
                    )}
                    <ComboboxComponent.Options className={styles.list}>
                        {filteredValues.map((value) => (
                            <ComboboxComponent.Option
                                key={value.id}
                                value={value}
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
                                            [],
                                        )}
                                    >
                                        {selected && (
                                            <Icon
                                                Svg={CheckedIcon}
                                                fill={false}
                                                stroke
                                                size="s"
                                            />
                                        )}
                                        {value.value}
                                    </li>
                                )}
                            </ComboboxComponent.Option>
                        ))}
                        {!values.length && (
                            <Text
                                text="Nothing found..."
                                className={styles.error}
                            />
                        )}
                    </ComboboxComponent.Options>
                </>
            )}
        </ComboboxComponent>
    );
};
