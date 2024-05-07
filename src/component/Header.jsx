import React from 'react'
import CityList from './CityList'

const Header = () => {
    return (
        <>
            <div className="from-yellow-700 t0-orange-700" >
                {/* <h1 className="text-center bg-red-600">
                    Infinite scroll - Weather Forecast Web Application
                </h1> */}
                <div class=" bg-orange-500 text-center mt-1 mb-8 h-20">
                    <h1 className='text-3xl font-bold pt-4'>World Weather Forecast</h1>
                    <p class="">Infinite scroll - Weather Forecast Web Application</p>
                </div>
                <CityList />

            </div>
        </>
    )
}

export default Header
