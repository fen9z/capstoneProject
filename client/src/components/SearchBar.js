import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log('Handle Search Clicked');
    // Use the inputValue directly for search query
    const searchQuery = inputValue.trim(); // Optional: Trim to remove leading/trailing spaces
    // do search logic, can base on search result to jump to different page
    // this is a simple example, jump to Product page and add search word in url
    navigate(`/Product?search=${searchQuery}`);
    // from Home.js to Product.js use the same searchBar component
    // home.js to product.js will navigate to product page
    // but now in the product.js, hwo do the search logic
    console.log('Navigating to Product Page');
    console.log('Search Query:', searchQuery);
  };

  return (
    <div className="search">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Store"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-danger"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
