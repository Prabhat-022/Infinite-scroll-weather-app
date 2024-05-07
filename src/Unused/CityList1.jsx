import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Weatherpage from './Weatherpage';
import { useNavigate } from 'react-router-dom';


const CityList1 = () => {
    const [list, setList] = useState([])
    const [cities, setCities] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [currentId, setCurrentid] = useState('');


    const fetchCityData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100");

            // console.log("data", response)
            setList(response.data)
            setCities(response.data.results);
            setItems(prevItems => [...prevItems, ...response.data.results]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching city data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        fetchCityData();


    }, []); // Empty dependency array ensures the effect runs only once

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }
        fetchCityData();
    };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm)
    };
    const handleSort = (e) => {
        setSortBy(e.target.text);
        console.log(sortBy)
    };
    console.log(sortBy)


    const filteredCities = cities.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()));


    // Sort cities based on the selected criteria
    const sortedCities = filteredCities.sort((a, b) => {

        // console.log("this is a sorted", a.name)

        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'country') {
            return a.country.localeCompare(b.country);
        }

        // Add more sorting criteria if needed
    });

    const history = useNavigate();

    const handleCityClick = (cname) => {
        console.log("c name", cname);
        <Weatherpage city={cname} />
        // history.push(`/weatherpage?${encodeURIComponent(cityName)}`);
        // console.log(`Clicked on city: ${cityName}`);
        history(/weatherpage)
    };

    const handleCountryClick = (countryName) => {
        // history.push(`/weatherpage?${encodeURIComponent(countryName)}`);
        // console.log(`Clicked on country: ${countryName}`);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    },)

    return (
        <>

                <table className="flex flex-col justify-between items-center border-collapse border border-slate-400 ">
                    <thead className="flex justify-between">
                        <tr >
                            <th className="px-4 border-sollid border-2 border-indigo-600">NO.</th>

                            <th className="px-4 border-sollid border-2 border-indigo-600">City</th>

                            {/* <th onClick={() => handleSort('name')}>City Name</th> */}
                            {/* <th onClick={() => handleSort('country')}>Country</th> */}

                            <th className="px-4 border-sollid border-2 border-indigo-600"> Country</th>

                            <th className="px-4 border-sollid border-2 border-indigo-600">TimeZone</th>

                            <th className="px-4 border-sollid border-2 border-indigo-600">Country Code</th>


                        </tr>
                    </thead>
                    <tbody className="">

                        {

                            // cities.map((city, i) => {
                            //     // console.log("cities",cities)
                            //     // console.log("city",city)
                            //     return (
                            //         <>
                            //             <tr className="" key={i}>
                            //                 <td className="px-3">{i}</td>
                            //                 <td className="px-3">{city.name}</td>
                            //                 <td className="px-3">{city.cou_name_en}</td>
                            //                 <td className="px-3">{city.timezone}</td>
                            //                 <td className="px-3">{city.country_code}</td>

                            //             </tr>

                            //         </>
                            //     )
                            // })

                            // filteredCities.map((city, i) => {
                            //     // console.log("cities",cities)
                            //     // console.log("city",city)
                            //     return (
                            //         <>
                            //             <tr className="" key={i}>
                            //                 <td className="px-3">{i}</td>
                            //                 <td className="px-3 cursor-pointer" onClick={} >{city.name}</td>
                            //                 <td className="px-3 cursor-pointer" onClick={} >{city.cou_name_en}</td>
                            //                 <td className="px-3">{city.timezone}</td>
                            //                 <td className="px-3">{city.country_code}</td>

                            //             </tr>

                            //         </>
                            //     )
                            // })

                            filteredCities.map((city, i) => {
                                const citydata = {
                                    city,
                                    currentId,
                                    setCurrentid
                                }
                                return (
                                    <tr className="" key={i}>
                                        <td className="px-3">{i}</td>
                                        <td className="px-3 cursor-pointer" onClick={() => setCurrentid(city.i)}>{city.name}</td>
                                        <td className="px-3 cursor-pointer" onClick={() => setCurrentid(city.i)}>{city.cou_name_en}</td>
                                        <td className="px-3">{city.timezone}</td>
                                        <td className="px-3">{city.country_code}</td>
                                    </tr>
                                );
                            })


                        }

                        {/* {sortedCities.map(city => (
                            <tr key={city.recordid}>
                                <td><Link to={`/weather/${city.name}`}>{city.name}</Link></td>
                                <td>{city.country}</td>
                            </tr>
                        ))} */}
                        {isLoading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}

                    </tbody>

                </table >
            </div>
        </>
    )
}

export default CityList
