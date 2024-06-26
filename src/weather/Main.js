import React, { useEffect, useState } from 'react'
import TopButton from './TopButton'
import Inputs from './Inputs'
import TimeandLocation from './TimeandLocation'
import TemperatureandDetails from './TemperatureandDetails'
import Forecast from './Forecast'
import getformattedWeatherData from './weatherServices'
import { useLocation } from 'react-router-dom';
import Header from '../component/Header';
import bcgimg from '../assets/bcg_img.png'


const Main = () => {
  const location = useLocation();
  let names = location.pathname.split('/')[2];

  const [query, setquery] = useState({ q: names });
  const [units, setunits] = useState("metric")
  const [weather, setweather] = useState(null)


  useEffect(() => {
    const fetchWeather = async () => {
      await getformattedWeatherData({ ...query, units }).then((data) => {
        setweather(data)
      });
      // console.log("data in main", data)
    }

    fetchWeather()
  }, [query, units]);

  const changeBackgroundColor = () => {
    if (!weather) {
      return 'from-cyan-700 to-blue-700'
    }

    const threshold = units === 'metric' ? 20 : 60

    if (weather.temp <= threshold) {
      return 'from-cyan-700 to-blue-700'
    }

    return 'from-yellow-700 to-orange-700'
  }

  return (
    <>
      <div className="" >
        <Header />

      </div>

      <div className={`'mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400' ${changeBackgroundColor()} `} style={{ backgroundImage: `url(${bcgimg})` }} >
        <TopButton setquery={setquery} />
        <Inputs setquery={setquery} units={units} setunits={setunits} />
        {weather && (
          <>
            <TimeandLocation weather={weather} />
            <TemperatureandDetails weather={weather} />

            <Forecast title="hourly forecast" items={weather.hourly} units={units} />
            <Forecast title="daily forecast" items={weather.daily} units={units} />
          </>
        )

        }

      </div>
    </>
  )
}

export default Main

