import React, { useState } from 'react';
import MapView from '../pages/MapView';
import './styles/RescuePage.css';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
                

const RescuePage = () => {
  const [location, setLocation] = useState(null);
  const [shelters, setShelters] = useState([]);
  const [error, setError] = useState(null);

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = {latitude: pos.coords.latitude, longitude: pos.coords.longitude};
        setLocation(userLocation);
        sendLocationToBackend(userLocation);
        setError(null);
      },
      (err) => {
        console.error("Geo error:", err);
        setError('Error fetching location: ' + err.message);
      }
    );
  };

  const sendLocationToBackend = async (loc) => {
    const {latitude, longitude} = loc;
    const url = `http://localhost:5000/shelters/near?lat=${latitude}&lon=${longitude}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();

    if (res.ok) {
      setShelters(data);
      setError(null);
    }
    else {
      setError(data.message || "server error");
      setShelters([]);
    }
  }

  return (
    <>
    <div className='page-heading'>
      <p className='title'>Smart Rescue App <i class="fa-solid fa-dog"></i></p>
      <p className='tagline'>helping every stray find care, love, and a home.</p>
    </div>
    <div className="main">
      <div className='btn-section'>
        <button className="rescue-btn" onClick={fetchLocation}>FIND SHELTERS</button>

        {location && (
          <p>Latitude: {location.latitude} | Longitude: {location.longitude}</p>
        )}

        {error && (<p style={{ color: "red" }}>{error}</p>)}
      </div>
          
      {shelters.length == 0 && (
      <div className='map-container'>
      <MapContainer center={[28.6139, 77.2090]} zoom={13} style={{height: "100%", width: "100%", borderRadius: "0.5rem", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1"}}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        </MapContainer>
      </div>
      )}

      {shelters && location && (
      <div className="map-container">
        <MapView shelters={shelters} userLocation={location} />
      </div>
      )}
    </div>
    </>
  );
}

export default RescuePage;