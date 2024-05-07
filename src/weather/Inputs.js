import React, { useState } from 'react'
// import { UilSearch, UilMapMarker } from '@iconscout/react-unicons'
import { UilSearch, UilMapMarker } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom';


const Inputs = ({ setquery, units, setunits }) => {
    const [city, setcity] = useState("");

    const handleunitsChange = (e) => {
        const selectedUnit = e.target.name;

        console.log("selected name", selectedUnit)
        if (units !== selectedUnit) {
            setunits({ selectedUnit })
        }
    }
    const handleSearch = () => {
        if (city !== '') {
            setquery({ q: city });
        }
    }

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setquery({
                    lat,
                    lon
                })
            })
        }
    }
    console.assert(setquery)
    return (
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input
                    value={city}
                    onChange={(e) => setcity(e.target.value)}
                    type='text'
                    placeholder='search for city......'
                    className='text-xl font-light p-2 shadow-xl focus:outline-none capitalize placeholder:lowercase text-black'
                />
            </div>

            <div className='flex items-center justify-center mx-4 '>
                <UilSearch size={25} className='text-white cursor-pointer transition ease-out hover:scale-125 ' onClick={handleSearch} />

                <Link to={'/map'}>

                    <UilMapMarker size={25} className='text-white cursor-pointer transition ease-out hover:scale-125'
                        onClick={handleLocationClick}
                    />
                </Link>
            </div>

            <div className=" flex flex-row w-1/4 items-center justify-center">
                <button name='metric' className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleunitsChange}>°C</button>

                <p className='text-white text-xl mr-1 ml-1 '>|</p>
                <button name='imperial' className='text-xl text-white font-light transition ease-out hover:scale-125'
                    onClick={handleunitsChange}
                >F</button>
            </div>
        </div>
    )
}

export default Inputs;
