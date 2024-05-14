import React, { useState, useEffect } from 'react';
import axios from 'axios';


const InfiniteScroll = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

    console.log(items, page)
    const fetchCityData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100");

            // console.log("data", response)
            setItems(prevItems => [...prevItems, ...response.data.results]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching city data:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }
        fetchCityData();
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },)

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </>

    )
}

export default InfiniteScroll
