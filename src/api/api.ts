import axios from 'axios';

export const $api = axios.create({
    baseURL: 'https://api.openweathermap.org',
});

$api.interceptors.request.use((config) => {
    config.params = config.params || {};

    config.params['appid'] = process.env.NEXT_PUBLIC_API_KEY;

    return config;
});
