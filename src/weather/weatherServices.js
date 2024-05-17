// expamle : http://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488exclude=current,minutely,houly,alerts&appid=e596278d4095aa9dc0e0ad6b02e9e8e0



import { DateTime } from "luxon";

const BASE_URL = "http://api.openweathermap.org/data/2.5"
const API_KEYS = process.env.API_KEY;

console.log(process.env.API_KEY)

const getWeatherData = (infoType, searchParams) => {

    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEYS });

    console.log(url);

    return fetch(url)
        .then((res) => res.json())
        .then((data) => (data));

    // console.log(data)
}

const formetCurrentWeather = (data) => {

    console.log("current", data);

    if (!data || !data.coord) {
        console.error("Data is undefined or Coord data is missing");
        return null; // Handle the error appropriately
    }

    // console.log("coord", data.coord.lat)
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data;
    const { main: details, icon } = weather[0];

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed
    }
}

// const formatForecastWeather = (data) => {
//     console.log("hourly", data)

//     let { timezone, daily, hourly } = data;
//     daily = daily.slice(1, 6).map(d => {
//         return {
//             title: formatToLocalTime(d.dt, timezone, 'ccc'),
//             temp: d.temp.day,
//             icon: d.weather[0].icon
//         }
//     });
//     hourly = hourly.slice(1, 6).map(d => {
//         return {
//             title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
//             temp: d.temp,
//             icon: d.weather[0].icon
//         }
//     });
//     return { timezone, daily, hourly }

// }

const formatForecastWeather = (data) => {
    console.log("hourly", data);

    // Check if 'list' property exists in the 'data' object
    if (!data || !data.list || !Array.isArray(data.list)) {
        console.error("Data structure is incorrect. 'list' property is missing or not an array.");
        return null; // or handle the error appropriately
    }

    const { list } = data;
    const timezone = data.city.timezone;

    // Extract daily data from the 'list'

    // Extract hourly data from the 'list'
    const hourly = list.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.main.temp,
            icon: d.weather[0].icon
        };
    });
    const daily = list.slice(2, 8).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            // temp: d.dt_txt.day,
            temp: d.main.temp,
            icon: d.weather[0].icon
        };
    });


    return { timezone, daily, hourly };
};


const getformattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
        .then(formetCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData('forecast', {
        lat, lon, exclude: "current, minutely, alerts",
        units: searchParams.units,
    }).then(formatForecastWeather)

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
}

//luxon library  form timezone 
const formatToLocalTime = (
    secs, zone, format = "cccc, dd LLL yyyy' | Local time:' hh:mm a "
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode = (code) =>
    `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getformattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };