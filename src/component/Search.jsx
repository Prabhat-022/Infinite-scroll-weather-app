import React, { useState } from 'react';
import List from './List';
import Main from '../weather/Main'


const Search = ({ list }) => {
    console.log('search in list', list);

    const [inputValue, setInputValue] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showWeatherPage, setShowWeatherPage] = useState(false);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
        const filteredSuggestions = list.filter(suggestion =>
            suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.name);
        setFilteredSuggestions([]);
    };

    // console.log(cities)
    // Filter cities based on search term
    const filteredCities = list.filter(city =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const filteredCountry = list.filter(city => city.cou_name_en.toLowerCase().includes(searchTerm.toLowerCase()));

    console.log("filteredCities", filteredCities)

    const handleClick = () => {
        // Toggle the visibility of WeatherPage component
        setShowWeatherPage(!showWeatherPage);
    };

    return (
        <div>
            <input type="text" placeholder="Search city, country name ..." value={searchTerm} onChange={handleSearch} class="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 text-black" />

            {/* <Autocomplete suggestions={list} /> */}

            {/* Autosuggestion popup model start =================================================================================================== */}
            <ul className=''>
                {filteredSuggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)} className='cursor-pointer border mt-1 mb-1'>
                        {suggestion.name}
                    </li>
                ))}
            </ul>

            {/* Autosuggestion popup model start =================================================================================================== */}
            <table class="">
                <tr class="flex justify-between  bg-slate-950">
                    <th class="px-4 py-2 font-bold">NO.</th>
                    <th class="px-4 py-2 font-bold">City</th>
                    <th class="px-4 py-2 font-bold">Country</th>
                    <th class="px-4 py-2 font-bold">TimeZone</th>
                    <th class="px-4 py-2 font-bold"> Code</th>
                </tr>


                {filteredCities.map((city, i) => (
                    <React.Fragment key={i}>
                        <List city={city} key={i} i={i} onClick={handleClick} />
                        {showWeatherPage && <Main />} {/* Render WeatherPage if showWeatherPage is true */}
                    </React.Fragment>
                ))}

                {filteredCountry.map((city, i) => (
                    <React.Fragment key={i}>
                        <List city={city} key={i} i={i} onClick={handleClick} />
                        {showWeatherPage && <Main />} {/* Render WeatherPage if showWeatherPage is true */}
                    </React.Fragment>
                ))}

            </table>
        </div>

    );
};

export default Search;
