import React from 'react';
import './SearchBar.css'

function SearchBar({placeholderText, handleSearchUser, query}) {
  return (
    <div style={{width: "100%"}}>
        <input
        type="text"
        className="search-input"
        placeholder={placeholderText}
        value={query}
        onChange={handleSearchUser} 
        />
    </div>
  )
}

export default SearchBar