import React, { useState, useEffect } from 'react'
import { IoSunny } from "react-icons/io5";
import axios from 'axios';


const Hourly = ({lat,lon}) => {
    console.log("houlry", lat)

    const apiKey = "e596278d4095aa9dc0e0ad6b02e9e8e0";
    const [datas, setDatas] = useState({});

    const houlydata = (lat,lon) => {
        const apiURL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}`
        axios.get(apiURL).then((res) => {
            setDatas(res.data)
            console.log("weather responses ", res.data);

        }).catch((error) => {

            console.log(error);
        })


    }
    useEffect(() => {
        houlydata(lat,lon)
    }, [])

    return (
        <>
            <div className="mt-4">
                <h1>HOURLY FORECAST</h1>
                <hr />
                <div className="flex  justify-between mt-4">
                    <div className=" flex flex-col items-center">
                        <div className="">
                            <p>12:00 PM</p>
                        </div>
                        <div className="">
                            <IoSunny className='text-2xl' />

                        </div>
                        <div className="">
                            <p>21 C°</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="">
                            <p>12:00 PM</p>
                        </div>
                        <div className="">
                            <IoSunny className='text-2xl' />

                        </div>
                        <div className="">
                            <p>21 C°</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="">
                            <p>12:00 PM</p>
                        </div>
                        <div className="">
                            <IoSunny className='text-2xl' />

                        </div>
                        <div className="">
                            <p>21 C°</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="">
                            <p>12:00 PM</p>
                        </div>
                        <div className="">
                            <IoSunny className='text-2xl' />

                        </div>
                        <div className="">
                            <p>21 C°</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="">
                            <p>12:00 PM</p>
                        </div>
                        <div className="">
                            <IoSunny className='text-2xl' />

                        </div>
                        <div className="">
                            <p>21 C°</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="">
                            <p>12:00 PM</p>
                        </div>
                        <div className="">
                            <IoSunny className='text-2xl' />

                        </div>
                        <div className="">
                            <p>21 C°</p>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Hourly
