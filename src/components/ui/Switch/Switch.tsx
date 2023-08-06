'use client';

import { ReactElement, memo, useState } from 'react';
import { Switch as SwitchComponent } from '@headlessui/react';
import styles from './Switch.module.scss';
import classNames from 'classnames';
import { Mods } from '@/types/Mods';

interface SwitchProps {
    className?: string;
    label?: ReactElement;
}

export const Switch = memo((props: SwitchProps) => {
    const { className, label } = props;
    const [enabled, setEnabled] = useState(false);

    const mods: Mods = {
        [styles.enabled]: enabled,
    };

    const content = (
        <SwitchComponent
            checked={enabled}
            onChange={setEnabled}
            className={classNames(styles.switch, mods, [
                'bg-gray-200',
                className,
            ])}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </SwitchComponent>
    );

    if (label) {
        return (
            <SwitchComponent.Group>
                <div className="flex items-center">
                    <SwitchComponent.Label className="mr-4" passive>
                        {label}
                    </SwitchComponent.Label>
                    {content}
                </div>
            </SwitchComponent.Group>
        );
    }

    return content;
});
