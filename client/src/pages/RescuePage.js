import React, { useState } from 'react';

function RescuePage() {
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
        setError('Error fetching location: ' + err.message);
      }
    );
  };

  const sendLocationToBackend = async (loc) => {
    const res = await fetch('http://localhost:5000/api/rescue', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loc)
    });
    const data = await res.json();
    setShelters(data);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Rescue</h1>
      <button onClick={fetchLocation}>Rescue</button>

      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      <p>Shelters near you:</p>
      <ul>
        {shelters.map((shelter, idx) => (
          <li key={idx}>
            {shelter.name} - {shelter.distance} - {shelter.contact}
          </li>
        ))}
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default RescuePage;