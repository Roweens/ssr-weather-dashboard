interface GetLongDayParams {
    date: string;
    locale?: string;
}

export function getLongDay({ date, locale = 'en-US' }: GetLongDayParams) {
    return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(
        new Date(date),
    );
}
