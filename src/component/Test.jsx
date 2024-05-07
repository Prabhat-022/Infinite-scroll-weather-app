import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Test = () => {
    const [cities, setCities] = useState([]);


    const fetchCityData = async () => {
        try {
            const response = await axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100");

            console.log("data", response.data.results)
            setCities(response.data.results);
        } catch (error) {
            console.error('Error fetching city data:', error);
        }

    };

    useEffect(() => {

        fetchCityData();


    }); // Empty dependency array ensures the effect runs only once




    return (
        <>
            <div className="">

                <table className="flex flex-col justify-between items-center border-collapse border border-slate-400 ">
                    <thead className="flex justify-between">
                        <tr >
                            <th className="px-4 border-sollid border-2 border-indigo-600">NO.</th>

                            <th className="px-4 border-sollid border-2 border-indigo-600">City</th>

                            <th className="px-4 border-sollid border-2 border-indigo-600"> Country</th>

                            <th className="px-4 border-sollid border-2 border-indigo-600">TimeZone</th>

                            <th className="px-4 border-sollid border-2 border-indigo-600">Country Code</th>


                        </tr>
                    </thead>
                    <tbody className="">

                        {

                            // cities.results.map((c, index) => {
                            //     console.log("data", cities)

                            //     return (
                            //         c.results.map((city, i) => {
                            //             return (
                            //                 <>
                            //                     <tr className="" key={i}>
                            //                         <td className="px-3">{i}</td>
                            //                         <td className="px-3">{city.name}</td>
                            //                         <td className="px-3">{city.cou_name_en}</td>
                            //                         <td className="px-3">{city.timezone}</td>
                            //                         <td className="px-3">{city.country_code}</td>

                            //                     </tr>

                            //                 </>
                            //             )
                            //         })
                            //     )
                            // })
                            cities.map((city, i) => {
                                return (
                                    <>
                                        <tr className="" key={i}>
                                            <td className="px-3">{i}</td>
                                            <td className="px-3">{city.name}</td>
                                            <td className="px-3">{city.cou_name_en}</td>
                                            <td className="px-3">{city.timezone}</td>
                                            <td className="px-3">{city.country_code}</td>

                                        </tr>

                                    </>
                                )
                            })
                        }

                    </tbody>

                </table >
            </div>
        </>
    )
}

export default Test;
