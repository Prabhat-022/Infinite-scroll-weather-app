import React from 'react'
import { iconUrlFromCode } from './weatherServices'

const Forecast = ({ title, items, }) => {
    console.log("forecast", items)
    return (
        <div>
            <div className="flex items-center justify-start mt-6">
                <p className="text-white font-medium uppercase"> {title}</p>
            </div>
            <hr className='my-2' />

            <div className="flex flex-row items-center justify-between text-white">

                {
                    items.map((item, i) => {
                        return (
                            <>
                                <div className="flex flex-col items-center justify-center text-white" key={i}>
                                    <p className='font-light text-sm'>{item.title}</p>
                                    <img src={iconUrlFromCode(item.icon)}
                                        className='w-12 my-1'
                                        alt="" />
                                    <p className='font-medium'>{item.temp}°C</p>
                                </div>

                            </>
                        )


                    })
                }
                {/* <div className="flex flex-col items-center justify-center text-white">
                    <p className='font-light text-sm'>delhi</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png"
                        className='w-12 my-1'
                        alt="" />
                    <p className='font-medium'>34 C</p>
                </div>
                <div className="flex flex-col items-center justify-center text-white">
                    <p className='font-light text-sm'>delhi</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png"
                        className='w-12 my-1'
                        alt="" />
                    <p className='font-medium'>34 C</p>
                </div>
                <div className="flex flex-col items-center justify-center text-white">
                    <p className='font-light text-sm'>delhi</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png"
                        className='w-12 my-1'
                        alt="" />
                    <p className='font-medium'>34 C</p>
                </div>
                <div className="flex flex-col items-center justify-center text-white">
                    <p className='font-light text-sm'>delhi</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png"
                        className='w-12 my-1'
                        alt="" />
                    <p className='font-medium'>34 C</p>
                </div>
                <div className="flex flex-col items-center justify-center text-white">
                    <p className='font-light text-sm'>delhi</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png"
                        className='w-12 my-1'
                        alt="" />
                    <p className='font-medium'>34 C</p>
                </div>
                <div className="flex flex-col items-center justify-center text-white">
                    <p className='font-light text-sm'>delhi</p>
                    <img src="http://openweathermap.org/img/wn/01d@2x.png"
                        className='w-12 my-1'
                        alt="" />
                    <p className='font-medium'>34 C</p>
                </div> */}

            </div>

        </div>
    )
}

export default Forecast
