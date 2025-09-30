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
        sendLocationToBackend(location);
        setError(null);
      },
      (err) => {
        setError('Error fetching location: ' + err.message);
      }
    );
  };

  const sendLocationToBackend = async (loc) => {
    const {latitude, longitude} = loc;
    const url = `http://localhost:5000/shelters/near?lat=${latitude}&lon=${longitude}`;
    console.log(url);

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
    <div style={{ padding: "20px" }}>
      <h1>Smart Rescue</h1>
      <button onClick={fetchLocation}>Rescue</button>

      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          Name - distance - contact
          {shelters.map((shelter, idx) => (
          <li key={idx}>
            {shelter.name} - {Math.round(shelter.distance)}m - {shelter.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RescuePage;