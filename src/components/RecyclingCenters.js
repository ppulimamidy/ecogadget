import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const recyclingIcon = new Icon({
  iconUrl: '../ecologo.png',
  iconSize: [25, 41],
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const RecyclingCenters = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [recyclingCenters, setRecyclingCenters] = useState([]);
  const [zoom, setZoom] = useState(13);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  const getRecyclingCenters = () => {
    setRecyclingCenters([
      { id: 1, name: 'Recycling Center 1', lat: 33.9233795, lng: -84.3436871 },
      { id: 2, name: 'Recycling Center 2', lat: 33.9028956, lng: -84.33592 },
    ]);
  };

  useEffect(() => {
    getUserLocation();
    getRecyclingCenters();
  }, []);

  useEffect(() => {
    if (userLocation && recyclingCenters.length > 0) {
      setZoom(14); // Adjust this value as needed
    }
  }, [userLocation, recyclingCenters]);

  if (!userLocation) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer center={userLocation} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <ChangeView center={userLocation} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {recyclingCenters.map((center) => (
        <Marker key={center.id} position={{ lat: center.lat, lng: center.lng }} icon={recyclingIcon}>
          <Popup>{center.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default RecyclingCenters;
