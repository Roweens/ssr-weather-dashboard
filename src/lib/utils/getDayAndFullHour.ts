'use client';
import dayjs from 'dayjs';

export function getDayAndFullHour(date: string) {
    return dayjs(date).format('ddd, HH:mm');
}
