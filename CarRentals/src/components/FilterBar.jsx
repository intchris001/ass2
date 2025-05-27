import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import cars from '../data/cars';

const getUnique = (arr, key) => Array.from(new Set(arr.map(item => item[key])));

const FilterBar = ({ type, brand, onTypeChange, onBrandChange }) => {
  const types = getUnique(cars, 'type');
  const brands = getUnique(cars, 'brand');

  return (
    <Box sx={{ display: 'flex', gap: 2, maxWidth: 400, mx: 'auto', my: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={e => onTypeChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {types.map(t => (
            <MenuItem key={t} value={t}>{t}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Brand</InputLabel>
        <Select
          value={brand}
          label="Brand"
          onChange={e => onBrandChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {brands.map(b => (
            <MenuItem key={b} value={b}>{b}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar; 