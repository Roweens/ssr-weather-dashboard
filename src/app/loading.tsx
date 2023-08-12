import { Loader } from '@/components/ui/Loader/Loader';
import { VStack } from '@/components/ui/Stack';
import React from 'react';

export default function Loading() {
    return (
        <VStack fullHeight max align="center" justify="center">
            <Loader />
        </VStack>
    );
}
