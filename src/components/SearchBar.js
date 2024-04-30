import React, { useState } from 'react';
import '../assets/Navbar.css';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const onInputChange = (event) => {
        const newTerm = event.target.value;
        setTerm(newTerm);
        onSearch(newTerm);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={term}
                onChange={onInputChange}
                placeholder="Search for movies or series..."
            />
        </div>
    );
};

export default SearchBar;
