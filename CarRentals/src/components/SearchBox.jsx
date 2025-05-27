import React, { useState } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';
import cars from '../data/cars';

const getSuggestions = (input) => {
  if (!input) return [];
  const lower = input.toLowerCase();
  const keywords = new Set();
  cars.forEach(car => {
    [car.brand, car.model, car.type, car.description].forEach(field => {
      if (field.toLowerCase().includes(lower)) {
        keywords.add(field);
      }
    });
  });
  return Array.from(keywords);
};

const SearchBox = ({ value, onChange, onSearch }) => {
  const [input, setInput] = useState(value || '');
  const [options, setOptions] = useState([]);

  const handleInputChange = (e, newInput) => {
    setInput(newInput);
    setOptions(getSuggestions(newInput));
    if (onChange) onChange(newInput);
  };

  const handleOptionSelect = (e, option) => {
    setInput(option);
    if (onChange) onChange(option);
    if (onSearch) onSearch(option);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(input);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', my: 2 }}>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={input}
        onInputChange={handleInputChange}
        onChange={handleOptionSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search cars"
            variant="outlined"
            onKeyDown={handleKeyDown}
            fullWidth
          />
        )}
      />
    </Box>
  );
};

export default SearchBox; 