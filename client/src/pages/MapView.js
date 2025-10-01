import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';

const MapView = ({shelters, userLocation}) => {
    const center = [userLocation.latitude, userLocation.longitude] || [28.6139, 77.2090] //fallback to Delhi

    return (
        <MapContainer center={center} zoom={13} style={{height:"400px", width:"80%"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {userLocation && (
                <Marker position={center} icon={L.icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png", iconSize: [30, 30]})} >
                    <Popup>You are here</Popup>
                </Marker>
            )}

            {shelters.map((shelter, idx) => (
                <Marker key={idx} 
                position={[shelter.location.coordinates[1], shelter.location.coordinates[0]]}
                icon={L.icon({ iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png", iconSize: [30, 30] })}>
                    <Popup>
                        <b>{shelter.name}</b><br/>
                        {shelter.address}<br/>
                        {shelter.phone}<br/>
                        <a href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.location.coordinates[1]},${shelter.location.coordinates[0]}`} target="_blank" rel="noreferrer">
                            Get Directions
                        </a>                        
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapView;