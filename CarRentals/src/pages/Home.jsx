import React, { useState } from 'react';
import CarGrid from '../components/CarGrid';
import LogoBar from '../components/LogoBar';
import ReservationIcon from '../components/ReservationIcon';
import SearchBox from '../components/SearchBox';
import FilterBar from '../components/FilterBar';
import cars from '../data/cars';

const Home = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');

  // 过滤汽车数据
  const filteredCars = cars.filter(car => {
    const matchSearch = !search || [car.brand, car.model, car.type, car.description].some(field => field.toLowerCase().includes(search.toLowerCase()));
    const matchType = !type || car.type === type;
    const matchBrand = !brand || car.brand === brand;
    return matchSearch && matchType && matchBrand;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fb', paddingBottom: 40 }}>
      <LogoBar />
      <ReservationIcon />
      <SearchBox value={search} onChange={setSearch} onSearch={setSearch} />
      <FilterBar type={type} brand={brand} onTypeChange={setType} onBrandChange={setBrand} />
      <CarGrid cars={filteredCars} />
    </div>
  );
};

export default Home; 