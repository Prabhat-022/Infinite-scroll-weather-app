import React from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from './InfiniteScroll'

const List = ({ city, i }) => {
    // console.log("city", city)
    return (
        <div>
              
                <tr class="mr-10" key={i}>

                    <td className=" cursor-pointer px-4 py-2 font-bold  ">
                        {i + 1}
                    </td>
                    <td className=" cursor-pointer px-4 py-2 font-bold" >
                        <Link to={`/weather/${city.name}`}>
                            {city.name}
                        </Link>
                    </td>
                    <td className="cursor-pointer px-4 py-2 font-bold" >
                        <Link to={`/weather/${city.cou_name_en}`}>
                            {city.cou_name_en}
                        </Link>
                    </td>
                    <td className="px-3">{city.timezone}</td>
                    <td className="px-3">{city.country_code}</td>
                    
                </tr>
            <InfiniteScroll />
        </div>
    )
}

export default List

// <tr class="flex justify-between  bg-gray-200" >
// <th class="px-4 py-2 font-bold">NO.</th>
// <th class="px-4 py-2 font-bold">City</th>
// <th class="px-4 py-2 font-bold">Country</th>
// <th class="px-4 py-2 font-bold">TimeZone</th>
// <th class="px-4 py-2 font-bold">Country Code</th>