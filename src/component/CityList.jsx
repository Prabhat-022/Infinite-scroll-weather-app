import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';


const CityList = () => {
    const [list, setList] = useState([])

    // console.log("list", list);

    useEffect(() => {
        FetchCityData();
    }, []);

    const FetchCityData = async () => {
        try {
            const response = await axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100");
            // console.log("data", response)
            setList(response.data.results)
        } catch (error) {
            console.error('Error fetching city data:', error);

        };
    }

    return (
        <>
            <p class="text-center font-bold mb-4">Country and city List</p>

                    <Search list={list} />
        </>
    )
}

export default CityList;

