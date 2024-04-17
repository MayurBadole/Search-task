import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import SearchBox from './assets/components/SearchBox';
 import Pagination from './assets/components/Pagination';
 import "./App.css"

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showError, setShowError] = useState("");

  const options = {
    method: 'GET',
    url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${searchTerm}`,
    headers: {
      'X-RapidAPI-Key': '488990036emsh410ed3bbb5de8bbp16a596jsn040aaa777392',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };
  
  
  
  const fetchResults = async () => {
    if (searchTerm) {
      setLoading(true);
      try {
        const response = await axios.request(options);
        setResults(response.data.data);
        setShowError("")
       
      } catch (error) {
        console.error('Error fetching data:', error);
        setShowError(" Please search using City Id")
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Debounce API call
    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 1000);  

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
 
  
  return (
    <div>
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <br/>
     {<p className='Showerror'>{showError}</p>}
      <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        
          <tr >
            <td> 1</td>  
            <td>{results.name}</td>  
           { results.countryCode && <td>
              <img
                src={`https://restcountries.com/v3.1/alpha/${results.countryCode}`}
                alt={`flag`}
                style={{ width: '24px', height: '16px' }}  
              />
              {results.country}
            </td>  }
          </tr>
       
      </tbody>
    </table>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalResults={results.length}
      />
    </div>
  );
};

export default App;
