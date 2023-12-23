// SearchBar.js

import React from 'react';
import './SearchBarStyle.css';

const SearchBar = ({value, onChange, placeholder, type}) => {
    return (
        <div className="search-bar">
            <input
                type={type || 'text'}
                className="form-control"
                placeholder={placeholder || 'Search...'}
                aria-label="Search"
                aria-describedby="button-addon2"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default SearchBar;
