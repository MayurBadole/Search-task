import React, { useRef } from 'react';
import "./SearchBox.css"

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  const searchInputRef = useRef(null);

  // Add keyboard shortcut for focusing search box
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        searchInputRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <input
      type="text"
      className="search-box" 
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          // Trigger search
        }
      }}
      ref={searchInputRef}
    />
  );
};

export default SearchBox;