
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { TiWeatherStormy } from "react-icons/ti";
import { IoMdSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { FaSun } from "react-icons/fa";
import { BsCloudSun } from "react-icons/bs";
import Hourly from './Hourly';
import Daily from './Daily';

const Weatherpage = () => {
    const apiKey = "e596278d4095aa9dc0e0ad6b02e9e8e0";

    const [cityName, setCityName] = useState("")

    const [data, setData] = useState({});
    const [currentTime, setCurrentTime] = useState(new Date());

    const location = useLocation();
    console.log(location.pathname.split('/')[2])
    let names = location.pathname.split('/')[2];
    // console.log("name", names)



    const getWetherDetails = (cityName) => {
        if (!cityName) return;
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
        axios.get(apiURL).then((res) => {
            console.log("weather response ", res.data);
            setData(res.data)

        }).catch((error) => {

            console.log(error);
        })
    }


    useEffect(() => {
        getWetherDetails(names)
    }, [names])


    useEffect(() => {
        // Function to update current time every second
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        // Clean up function to clear interval when component unmounts
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    // const dynemicWeathericon = (data) => {
    //     let icon = data.weather.main;
    //     switch (icon) {
    //         case icon = "cloud":
    //             return <div>
    //                 <TiWeatherStormy />

    //             </div>
    //         default:
    //             return <div></div>
    //     }

    // }
    function convertTimestampToTime(timestamp) {
        if (!timestamp) return '';

        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }

    const getCityName = (e) => {
        setCityName(e.target.value);
        console.log(e.target.value);
    }

    const handleSearch = () => {
        getWetherDetails(cityName)

    }


    const formattedTime = formatDate(currentTime);
    return (
        <>
            {/* <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-4">Weather App</h1>
                <div className="output_area text-center p-8">
                    <span className="dot inline-block h-4 w-4 rounded-full bg-gray-500 mr-2"></span>
                    <h2 className="text-xl font-bold mb-2">{data?.name}</h2>
                    <h1 className="text-4xl font-bold"> Max temp: {((data?.main?.temp_max) - 273.15).toFixed(2)}°C</h1>
                    <h1 className="text-4xl font-bold">Min temp: {((data?.main?.temp_min) - 273.15).toFixed(2)}°C</h1>
                    <h1 className="text-4xl font-bold">Humidity{((data?.main?.humidity) - 273.15).toFixed(2)}°C</h1>
                    <h1 className="text-4xl font-bold">Pressure{((data?.main?.pressure) - 273.15).toFixed(2)}°C</h1>
                </div>
                <div className="">
        <h1 className="text-4xl font-bold">{((data?.wind?.speed) - 273.15).toFixed(2)}°C</h1>
        <p className="text-lg mt-4">Sunrise: {convertTimestampToTime(data?.sky?.sunrise)}</p>
        <p className="text-lg">Sunset: {convertTimestampToTime(data?.sky?.sunset)}</p>
    </div>
            </div> */}

            <div class="container mx-auto px-4 py-8 bg-orange-400 w-full h-full">
                <header className='mt-1 mb-5'>
                    <nav>
                        <ul className='flex flex-row justify-between cursor-pointer'>
                            <li> London </li>
                            <li> Sydney </li>
                            <li> Tokyo </li>
                            <li> Paris </li>
                            <li> Delhi</li>
                        </ul>
                    </nav>
                </header>
                <div className=" flex  items-center justify-center">
                    <div className="flex">
                        <input type="text" placeholder='Enter City Name' value={cityName} onChange={getCityName} />
                        <button onClick={handleSearch} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <IoMdSearch />
                        </button>
                    </div>
                    <IoLocationOutline />

                    <div className="flex">
                        <p>°C</p>
                        <p>|°F</p>
                    </div>

                </div>

                <div class="flex flex-col justify-center items-center mt-5 text-white">
                    <div className="">
                        {
                            formattedTime
                        }
                    </div>
                    <h3 class="text-3xl font-semibold">{data?.name}</h3>
                    {
                        
                    }
                    <TiWeatherStormy />
                    <FaSun />
                    <BsCloudSun />
                    {
                        // dynemicWeathericon()
                    }
                    <div class="flex items-center mt-2">
                        <div class="ml-4">
                            <p class="text-xl">{(data?.weather?.description)}</p>
                            <p p className="text-green-400">{data?.weather?.main}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 text-white">
                    <h3 className="text-xl font-bold text-white text-center">Today Weathers</h3>
                    <div className="flex justify-between items-center">
                        <div className="">
                            <IoSunny className='text-5xl' />
                        </div>
                        <div className="text-5xl">
                            <h1>21</h1>
                        </div>
                        <div className="">
                            <p><span class="font-semibold">Max temp:</span> {((data?.main?.temp_max) - 273.15).toFixed(2)}°C</p>

                            <p><span class="font-semibold">Min temp:</span> {((data?.main?.temp_min) - 273.15).toFixed(2)}°C</p>
                            <p><span class="font-semibold">Wind:</span> {(data?.wind?.speed)} km/h</p>
                            <p><span class="font-semibold">Humidity:</span> {((data?.main?.humidity))}%</p>
                            <p><span class="font-semibold">Visibility:</span> {(data?.visibility)}</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="flex justify-between items-center text-white mt-4">
                        <div className="flex items-center">
                            <IoSunny className='text-2xl' />
                            <p className="font-semibold">Sunrise: {convertTimestampToTime(data?.sys?.sunrise)}</p>
                        </div>
                        <div className="flex items-center">
                            <IoSunny className='text-2xl' />
                            <p className="font-semibold ">Sunset: {convertTimestampToTime(data?.sys?.sunset)}</p>

                        </div>
                        <div className="flex items-center">
                            <IoSunny className='text-2xl' />
                            <p><span class="font-semibold">Max temp:</span> {((data?.main?.temp_max) - 273.15).toFixed(2)}°C</p>

                        </div>
                        <div className="flex items-center">
                            <IoSunny className='text-2xl' />
                            <p><span class="font-semibold">Min temp:</span> {((data?.main?.temp_min) - 273.15).toFixed(2)}C°</p>

                        </div>
                    </div>
                </div>
                {/* {
                       const lat = data.coord.lat;
                       console.log(lat)
                       const lon = data.coord.lon;  
                } */}

                <Hourly lat={data?.coord?.lat} lon={data?.coord?.lon} />
                <Daily />
            </div>

        </>
    )
}
function formatDate(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    return date.toLocaleDateString('en-US', options);
}
export default Weatherpage;




// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Header from './Header';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'


// const Weatherpage = () => {

// console.log("city name  w" ,city)
// console.log("country name  w" ,country)
//     const apiKey = "e596278d4095aa9dc0e0ad6b02e9e8e0";

// const [cityName, setCityName] = useState("")
// const [useData, setuseData] = useState()
//     const [data, setData] = useState({});

// const location = useLocation();
// console.log(location.pathname.split('/')[2])
// let names = location.pathname.split('/')[2];
// console.log("name", names)
//     let name = 'patna'

// const country = new URLSearchParams(location.search).get('city');
// const city = new URLSearchParams(location.search).get('city');

// useEffect(() => {
//     Getwetherdetails(name);
// }, [])


// const Getwetherdetails = (names) => {
//     console.log("api", names)
//     if (!names) return;
//     const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + names + "&appid=" + apiKey
//     axios.get(apiURL).then((res) => {
//         console.log("response ", res.data);
//         setData(res.data)

//     }).catch((error) => {

//         console.log(error);
//     })
// }




//     const getCityName = (e) => {
//         //     console.log(e.target.value);
//         // }

//         function convertTimestampToTime(timestamp) {
//             if (!timestamp) return '';

//             const date = new Date(timestamp * 1000);
//             const hours = date.getHours();
//             const minutes = date.getMinutes();

//             return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
//         }


//         return (
//             <>
// {/* <h1>hello wrold</h1>
// <div className="container mx-auto">
//     <h1>hello </h1>
//     <Header />
//     <h1 className="text-3xl font-bold mb-4">Weather App</h1>
//     <div className="output_area text-center p-8">
//         <span className="dot inline-block h-4 w-4 rounded-full bg-gray-500 mr-2"></span>
//         <h2 className="text-xl font-bold mb-2">{data?.name}</h2>
//         <h1 className="text-4xl font-bold"> Max temp: {((data?.main?.temp_max) - 273.15).toFixed(2)}°C</h1>
//         <h1 className="text-4xl font-bold">Min temp: {((data?.main?.temp_min) - 273.15).toFixed(2)}°C</h1>
//         <h1 className="text-4xl font-bold">Humidity{((data?.main?.humidity) - 273.15).toFixed(2)}°C</h1>
//         <h1 className="text-4xl font-bold">Pressure{((data?.main?.pressure) - 273.15).toFixed(2)}°C</h1>
//     </div>
//     <div className="">
//         <h1 className="text-4xl font-bold">{((data?.wind?.speed) - 273.15).toFixed(2)}°C</h1>
//         <p className="text-lg mt-4">Sunrise: {convertTimestampToTime(data?.sky?.sunrise)}</p>
//         <p className="text-lg">Sunset: {convertTimestampToTime(data?.sky?.sunset)}</p>
//     </div>
// </div> */}

//             </>
//         )
//     }
// }

// export default Weatherpage