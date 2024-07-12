import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';

import { CurrentWeather } from "./Weather";

export function SearchBar() {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // State to store the selected location

  const handleSearch = async (location) => {
    setIsLoading(true);

    const response = await fetch(`http://localhost:5001/api/location/search/${encodeURIComponent(location)}`);
    const results = await response.json();

    setOptions(results.data);
    setIsLoading(false); // Set loading to false once options are fetched
  };

  const handleLocationSelect = (option) => {
    setSelectedLocation(`${option.name} + ' '+ ${option.region}`); // Set the selected location
  };

  return (
    <div>      
      <AsyncTypeahead
        filterBy={() => true}
        id="search-bar"
        delay={300}
        isLoading={isLoading}
        labelKey="name"
        minLength={3}
        onSearch={(location) => handleSearch(location)}
        options={options}
        placeholder="Search location..."
        renderMenuItemChildren={(option) => (
          <>
            <span onClick={() => handleLocationSelect(option)}>
              {option.name}, {option.region}
            </span>
          </>
        )}
      />
      {selectedLocation && <CurrentWeather location={selectedLocation} />}
    </div>
  );
}
