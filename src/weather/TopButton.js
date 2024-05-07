import React from 'react'

const TopButton = ({setquery}) => {
    const cities = [
        {
            id: 1,
            title: 'Delhi'
        },
        {
            id: 2,
            title: 'Mumbai'
        },
        {
            id: 3,
            title: 'Bengaluru'
        },
        {
            id: 4,
            title: 'Chennai'
        },
        {
            id: 5,
            title: 'Pune'
        },
        {
            id: 6,
            title: 'Patna'
        },

    ]
    return (
        <div className="flex items-center justify-around my-6">
            {
                cities.map((city) => (
                    <button key={city.id} className="text-white text-lg font-medium" 
                    onClick={() => setquery({ q: city.title })}>
                        {city.title}
                    </button>
                ))
            }

        </div>
    )
}

export default TopButton
