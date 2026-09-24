const axios = require('axios');

async function forwardGeocode(q) {
    try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5`;
        const response = await axios.get(url);
        // Map GeoJSON back to the Nominatim array format our frontend expects
        if (response.data && response.data.features) {
            return response.data.features.map(f => {
                const props = f.properties;
                const nameParts = [props.name, props.city, props.state, props.country].filter(Boolean);
                const uniqueParts = [...new Set(nameParts)];
                return {
                    lat: f.geometry.coordinates[1].toString(),
                    lon: f.geometry.coordinates[0].toString(),
                    display_name: uniqueParts.join(', ')
                };
            });
        }
        return [];
    } catch (e) {
        console.error("Photon forward geocode error:", e.message);
        return [];
    }
}

async function reverseGeocode(lat, lng) {
    try {
        const url = `https://photon.komoot.io/reverse?lon=${lng}&lat=${lat}`;
        const response = await axios.get(url);
        if (response.data && response.data.features && response.data.features.length > 0) {
            const props = response.data.features[0].properties;
            const city = props.city || props.town || props.village || props.county || '';
            const state = props.state || '';
            const name = props.name || '';
            
            if (city && state) return city === name ? `${city}, ${state}` : `${name}, ${city}`;
            return city || state || name || 'Unknown Location';
        }
    } catch (e) {
        console.error("Photon reverse geocode error:", e.message);
    }
    return 'Unknown Location';
}

module.exports = { forwardGeocode, reverseGeocode };
