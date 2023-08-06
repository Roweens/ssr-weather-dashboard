import { ReactElement, ReactNode, memo } from 'react';
import classNames from 'classnames';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
    className?: string;
    header: ReactElement;
    children: ReactNode;
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, children, header } = props;

    return (
        <div className={classNames(styles.mainLayout, {}, [className])}>
            <div className={styles.header}>{header}</div>
            <div className={styles.content}>{children}</div>
        </div>
    );
});
