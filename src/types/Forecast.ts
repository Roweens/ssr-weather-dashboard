export type ForecastView = 'short' | 'detailed';

export type TemperatureFormat = 'standard' | 'metric';

interface Coordinates {
    lat: number;
    lon: number;
}

interface City {
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
    coord: Coordinates;
}

interface DayForecastMain {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
}

interface DayForecastWind {
    deg: number;
    gust: number;
    speed: number;
}

interface DayForecastWeather {
    description: string;
    icon: string;
    id: number;
    main: string;
}
export interface DayForecast {
    dt: number;
    dt_txt: string;
    pop: 0;
    visibility: number;
    main: DayForecastMain;
    clouds: { all: number };
    sys: { pod: string };
    wind: DayForecastWind;
    weather: DayForecastWeather[];
    rain: { '3h': number };
}
export interface ForecastType {
    city: City;
    cnt: number;
    cod: string;
    message: number;
    list: DayForecast[];
}
