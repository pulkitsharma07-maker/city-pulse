import React, { useState, useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LocationContext } from '../../context/LocationContext';
import { LanguageContext } from '../../context/LanguageContext';
import { useDashboard } from '../../hooks/useDashboard';
import FilterPanel from './FilterPanel';

// Fix for custom icon to avoid vite asset issues
const createCustomIcon = (status) => {
  const colors = {
    green: '#7CAA6E',
    amber: '#C4A23D',
    red: '#C27156',
    grey: '#B8B3AD'
  };
  const color = colors[status] || colors.grey;
  
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" class="animate-soft-pulse" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">
      <path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>`;

  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: svgIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const userLocationIcon = L.divIcon({
  className: 'user-location-icon',
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.3));">
      <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#ffffff" stroke-width="3" />
    </svg>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

const MapUpdater = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 13);
    }
  }, [lat, lng, map]);
  return null;
};

const MapClickHandler = () => {
  const { setLocationByCoords } = useContext(LocationContext);
  useMapEvents({
    click(e) {
      setLocationByCoords(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapTab = () => {
  const { lat, lng, areaName } = useContext(LocationContext);
  const { t } = useContext(LanguageContext);
  const { data } = useDashboard();
  const [activeFilters, setActiveFilters] = useState([]);

  const categories = data?.categories || [];
  
  const getDetailArray = (cat) => {
    if (!cat || !cat.detail) return [];
    return cat.detail.reports || cat.detail.routes || cat.detail.closures || cat.detail.lines || cat.detail.items || [];
  };

  const markers = [];
  categories.forEach((cat, catIdx) => {
    const items = getDetailArray(cat);
    
    // If category has no detail arrays (e.g. weather, air_quality), just show 1 marker
    if (items.length === 0) {
      // Deterministic offset for the category
      const dlat = Math.sin(catIdx) * 0.01;
      const dlng = Math.cos(catIdx) * 0.01;
      markers.push({ 
        ...cat, 
        lat: lat + dlat, 
        lng: lng + dlng, 
        key: `${cat.category}-main`
      });
      return;
    }

    // Generate a marker for each item
    items.forEach((item, itemIdx) => {
      // Use item's real lat/lng if provided, otherwise deterministically scatter widely
      let itemLat = item.lat;
      let itemLng = item.lng;
      if (!itemLat || !itemLng) {
        // Pseudo-random but stable wide spread based on indices
        const spread = 0.06; // wider spread
        const pseudoRand = (Math.sin(catIdx * 10 + itemIdx) + 1) / 2; // 0 to 1
        const pseudoRand2 = (Math.cos(catIdx * 10 + itemIdx) + 1) / 2; // 0 to 1
        itemLat = lat + (pseudoRand - 0.5) * spread;
        itemLng = lng + (pseudoRand2 - 0.5) * spread;
      }
      
      const title = item.location || item.road || item.name || item.title || cat.category;
      const desc = item.reason || item.description || item.note || item.type || cat.summary;
      const itemStatus = item.status || item.severity || cat.status;
      
      markers.push({
        category: cat.category,
        status: itemStatus === 'high' ? 'red' : itemStatus === 'medium' ? 'amber' : itemStatus === 'low' ? 'green' : itemStatus,
        summary: title,
        description: desc,
        lat: itemLat,
        lng: itemLng,
        key: `${cat.category}-${itemIdx}`
      });
    });
  });

  const visibleMarkers = activeFilters.length === 0 
    ? markers 
    : markers.filter(m => activeFilters.includes(m.category));

  return (
    <div className="relative h-[calc(100vh-140px)] w-full rounded-xl overflow-hidden glass-panel shadow-lg transition-all duration-500 hover:shadow-xl animate-fade-in">
      <FilterPanel 
        categories={categories.map(c => c.category)} 
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      
      <MapContainer center={[lat, lng]} zoom={13} style={{ height: '100%', width: '100%', background: 'transparent' }}>
        <TileLayer
          attribution='Tiles &copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}"
        />
        <MapUpdater lat={lat} lng={lng} />
        <MapClickHandler />
        
        {/* User's Selected Location Marker */}
        <Marker position={[lat, lng]} icon={userLocationIcon} zIndexOffset={1000}>
          <Popup className="custom-popup">
            <div className="font-sans">
              <h3 className="font-semibold text-base mb-1">Current Focus</h3>
              <p className="text-sm text-gray-600 truncate max-w-[200px]">{areaName}</p>
            </div>
          </Popup>
        </Marker>

        {visibleMarkers.map(marker => (
          <Marker 
            key={marker.key} 
            position={[marker.lat, marker.lng]}
            icon={createCustomIcon(marker.status)}
          >
            <Popup className="custom-popup">
              <div className="font-sans min-w-[200px]">
                <h3 className="font-semibold text-base mb-1">{t(`categories.${marker.category}`)}</h3>
                <p className="text-sm font-medium mb-1">{marker.summary}</p>
                {marker.description && <p className="text-sm text-gray-600 mb-2">{marker.description}</p>}
                <div className="text-xs px-2 py-1 bg-gray-100 rounded inline-block mt-1">
                  Status: <span className="font-medium">{t(`status.${marker.status || 'grey'}`) || marker.status || 'unknown'}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapTab;
