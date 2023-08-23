'use client';

import { memo, ReactNode, useCallback, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import { a, useSpring, config } from '@react-spring/web';
import classNames from 'classnames';
import styles from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { useIsClient } from '@/lib/context/ClientContext/ClientProvider';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
    const { children, className, isOpen, onClose } = props;
    const height = useIsClient() ? window.innerHeight - 100 : 1000;
    const [{ y }, api] = useSpring(() => ({ y: height }));

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            offset: [, oy],
            cancel,
        }) => {
            if (oy < -70) cancel();

            if (last) {
                oy > height * 0.5 || (vy > 0.5 && dy > 0)
                    ? close()
                    : openDrawer();
            } else api.start({ y: oy, immediate: true });
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    return (
        <Portal>
            <div className={classNames(styles.drawer, {}, [className])}>
                <a.div
                    className={styles.animatedComponent}
                    {...bind()}
                    style={{
                        display,
                        bottom: `calc(-100vh + ${height - 100}px)`,
                        y,
                    }}
                >
                    {children}
                </a.div>
            </div>
        </Portal>
    );
});

Drawer.displayName = 'Drawer';
export default Drawer;
