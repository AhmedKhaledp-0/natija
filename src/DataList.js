import React, { useState } from 'react';
import data from './output.json'; 


const IdLookupForm = () => {
    const [inputId, setInputId] = useState('');
    const [inputName, setInputName] = useState('');
    const [results, setResults] = useState([]);
    const referenceValueLower = 410; 
    const referenceValueHigher = 670; 

  
    const calculatePercentage = (value) => {
        const referenceValue = value > referenceValueLower ? referenceValueHigher : referenceValueLower;
        return ((value / referenceValue) * 100).toFixed(2);
      };
  
    const nameMatches = (name, searchInput) => {
      const searchParts = searchInput.toLowerCase().split(' ').filter(part => part); 
      return searchParts.every(part => name.toLowerCase().includes(part));
    };
  

    const handleSubmit = (event) => {
      event.preventDefault(); 
  
      let filteredResults = [];
      if (inputId) {
        const item = data.find((entry) => entry.id === parseInt(inputId));
        if (item) {
          filteredResults = [item];
        } else {
          filteredResults = [{ name: 'Not found', result: 'N/A' }];
        }
      } else if (inputName) {
        filteredResults = data.filter((entry) =>
          nameMatches(entry.name, inputName)
        );
        if (filteredResults.length === 0) {
          filteredResults = [{ name: 'No results found', result: 'N/A' }];
        }
      }
      setResults(filteredResults);
      
    };
  
    return (
      <div>
        <h1>sample form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="idInput">Enter ID:</label>
            <input
              id="idInput"
              type="number"
              value={inputId}
              onChange={(e) => {
                setInputId(e.target.value);
                setInputName(''); 
              }}
            />
          </div>
          <div>
            <label htmlFor="nameInput">Enter Name:</label>
            <input
              id="nameInput"
              type="text"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                setInputId(''); // Clear ID input when name is provided
              }}
            />
          </div>
          <button type="submit">Lookup</button>
        </form>
        <div>
          {results.length > 0 && (
            <div>
              {results.map((result, index) => (
                <div key={index}>
                  <h2>Result:</h2>
                  <p><strong>Name:</strong> {result.name}</p>
                  <p><strong>Result:</strong> {result.result}</p>
                  {result.result !== 'N/A' && (
                    <p><strong>Percentage of 410:</strong> {calculatePercentage(result.result)}%</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default IdLookupForm;