import {MapContainer, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import L from 'leaflet';
import './styles/MapView.css';

const dogIcon = L.divIcon({
  html: `<i class="fa-solid fa-shield-dog"></i>`,
  className: "custom-dog-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const userIcon = L.divIcon({
  html: `<i class="fa-solid fa-location-dot"></i>`,
  className: "custom-user-icon",
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

const MapView = ({shelters, userLocation}) => {
    const center = [userLocation.latitude, userLocation.longitude] || [28.6139, 77.2090] //fallback to Delhi

    return (
        <MapContainer center={center} zoom={13} style={{height: "100%", width: "100%",
            borderRadius: "0.5rem", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1"
        }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {userLocation && (
                <Marker position={center} icon={userIcon}>
                    <Popup>You are here</Popup>
                </Marker>
            )}

            {shelters.map((shelter, idx) => (
                <div className="marker">
                <Marker key={idx} 
                position={[shelter.location.coordinates[1], shelter.location.coordinates[0]]}
                icon={dogIcon}>
                    <Tooltip direction='bottom' offset={[0, 8.5]} permanent>
                        {shelter.name}
                    </Tooltip>
                    
                    <Popup>
                        <b>{shelter.name}</b><br/>
                        {shelter.address}<br/>
                        {shelter.phone}<br/>
                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.location.coordinates[1]},${shelter.location.coordinates[0]}`} target="_blank" rel="noreferrer">
                            Get Directions
                        </a>                        
                    </Popup>
                </Marker>
                </div>
            ))}
        </MapContainer>
    );
};

export default MapView;