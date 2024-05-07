import React, { useState } from 'react';

const Autocomplete = ({ suggestions }) => {

  console.log('suggestions in list', suggestions)

  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    const filteredSuggestions = suggestions.filter(suggestion =>
      suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.name);
    setFilteredSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <ul>
        {filteredSuggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
