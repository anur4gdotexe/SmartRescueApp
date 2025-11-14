import React, { useState } from 'react';
import RescuePage from './pages/RescuePage'; 
import 'leaflet/dist/leaflet.css';
import AdoptionPage from './pages/AdoptionPage';
import './App.css';

const App = () => {
  return (
    <div className='page'>
      <div className='rsc-section'>< RescuePage /></div>
      <div className='adp-section'>< AdoptionPage /></div>      
    </div>
  );
}

export default App;