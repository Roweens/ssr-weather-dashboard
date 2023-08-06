'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseGeolocationParams {
    successCallback?: (position: GeolocationPosition) => void;
}

export const useGeolocation = (args: UseGeolocationParams) => {
    const { successCallback } = args;

    const [geolocation, setGeolocation] = useState<GeolocationPosition | null>(
        null,
    );
    const [error, setError] = useState<string | null>(null);

    const onSuccess = useCallback(
        (position: GeolocationPosition) => {
            setGeolocation(position);
            successCallback?.(position);
        },
        [successCallback],
    );

    const onError = useCallback((error: GeolocationPositionError) => {
        setError(error.message);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            setError('Geolocation is not supported');
        }
    }, [onError, onSuccess]);

    return [geolocation, error] as const;
};
