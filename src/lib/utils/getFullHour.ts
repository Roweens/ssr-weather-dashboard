import dayjs from 'dayjs';

export function getFullHour(date: string) {
    return dayjs(date).format('HH:mm');
}
