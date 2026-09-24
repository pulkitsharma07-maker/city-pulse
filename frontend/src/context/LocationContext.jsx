import React, { createContext, useState, useEffect } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [lat, setLat] = useState(26.9124);
  const [lng, setLng] = useState(75.7873);
  const [areaName, setAreaName] = useState('Jaipur, Rajasthan');

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const res = await fetch(`/api/v1/reverse-geocode?lat=${latitude}&lng=${longitude}`);
      const data = await res.json();
      return data?.area_name || 'Current Location';
    } catch {
      return 'Current Location';
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLat = position.coords.latitude;
          const newLng = position.coords.longitude;
          setLat(newLat);
          setLng(newLng);
          const name = await reverseGeocode(newLat, newLng);
          setAreaName(name);
        },
        async () => {
          // Geolocation denied — try IP-based fallback
          try {
            const res = await fetch('/api/v1/ip-locate');
            const data = await res.json();
            if (data?.lat && data?.lon) {
              setLat(data.lat);
              setLng(data.lon);
              setAreaName(data.city || 'India');
            }
          } catch {
            // Keep Jaipur defaults
          }
        }
      );
    }
  }, []);

  const setLocation = (newLat, newLng, newName) => {
    setLat(newLat);
    setLng(newLng);
    setAreaName(newName);
  };

  const setLocationByCoords = async (newLat, newLng) => {
    setLat(newLat);
    setLng(newLng);
    setAreaName("Locating..."); // Optimistic UI update
    const name = await reverseGeocode(newLat, newLng);
    setAreaName(name);
  };

  const searchLocation = async (query) => {
    try {
      const res = await fetch(`/api/v1/geocode?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setLat(parseFloat(data[0].lat));
        setLng(parseFloat(data[0].lon));
        setAreaName(data[0].display_name?.split(',')[0] || query);
      }
    } catch (e) {
      console.error("Geocoding failed", e);
    }
  };

  return (
    <LocationContext.Provider value={{ lat, lng, areaName, setLocation, setLocationByCoords, searchLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
