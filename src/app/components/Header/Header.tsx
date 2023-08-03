import { memo } from 'react';

interface HeaderProps {
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className } = props;

    return <div className={''}>Header</div>;
};
