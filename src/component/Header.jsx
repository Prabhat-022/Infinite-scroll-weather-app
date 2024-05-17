import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className="flex items-center justify-between border-b-[1px] w-screen h-10 mt-5 p-5 " >

                <div class=" bg-transparent text-center mt-1 mb-8 h-20">
                    <h1 className='text-2xl font-bold pt-4'>World Weather Forecast</h1>
                    <p class="text-sm">Infinite scroll - Weather Forecast Web Application</p>
                </div>

                <div className="text-white flex justify-between mr-2">
                    <Link to={"/"} className='mr-10 hover:bg-slate-600'>Home</Link>
                    <Link to={"weather/:delhi"} className='hover:bg-slate-600'>Weather</Link>
                </div>
            </div>

        </>
    )
}

export default Header
