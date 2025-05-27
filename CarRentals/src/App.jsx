import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import { SelectedCarProvider } from './context/SelectedCarContext';

function App() {
  return (
    <SelectedCarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
      </Router>
    </SelectedCarProvider>
  );
}

export default App; 