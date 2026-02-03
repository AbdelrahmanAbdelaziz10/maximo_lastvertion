import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const SRMap = ({ setLat, setLng }) => {
  const [mapCenter, setMapCenter] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userLocation = { lat: coords.latitude, lng: coords.longitude };
        setMapCenter(userLocation);
        setMarkerPosition(userLocation);

        // Set initial values
        setLat(coords.latitude.toFixed(6));
        setLng(coords.longitude.toFixed(6));
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, [setLat, setLng]);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setMarkerPosition({ lat, lng });
    setLat(lat.toFixed(6));
    setLng(lng.toFixed(6));
  };

  return (
    <div style={{ width: "100%", height: "48vh", borderRadius: "10px" }}>
      <LoadScript googleMapsApiKey="AIzaSyBrgBBWX4PHPWcna4wXPhGvwK7d-leCZQk">
        {mapCenter && (
          <GoogleMap
            center={mapCenter}
            zoom={15}
            onClick={handleMapClick}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default SRMap;
