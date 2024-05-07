

// Implementing Filtering and Sorting:
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const Filtersort = () => {
    const [cities, setCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name");
            setCities(response.data.results);
        } catch (error) {
            console.error('Error fetching city data:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (field) => {
        setSortBy(field);
    };

    const filteredCities = cities.filter(city => city.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Sort cities based on the selected criteria
    const sortedCities = filteredCities.sort((a, b) => {
        if (sortBy === 'name') {
            return a.fields.name.localeCompare(b.fields.name);
        } else if (sortBy === 'country') {
            return a.fields.country.localeCompare(b.fields.country);
        }
        // Add more sorting criteria if needed
    });

    return (
        <div>
            <h1>City Table</h1>
            <input type="text" placeholder="Search city" value={searchTerm} onChange={handleSearch} />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>City Name</th>
                        <th onClick={() => handleSort('country')}>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCities.map(city => (
                        <tr key={city.recordid}>
                            <td><Link to={`/weather/${city.fields.name}`}>{city.fields.name}</Link></td>
                            <td>{city.fields.country}</td>
                        </tr>
                    ))}
                </tbody> 
            </table>
        </div>
    );
};

export default Filtersort;
