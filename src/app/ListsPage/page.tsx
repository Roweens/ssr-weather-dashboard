import { memo } from 'react';

interface ListsPageProps {
    className?: string;
}

export const ListsPage = (props: ListsPageProps) => {
    const { className } = props;

    return <main className={''}>Lists</main>;
};
