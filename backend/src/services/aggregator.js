const weather = require('./weather');
const airQuality = require('./airQuality');
const synthetic = require('./synthetic');
const geocoding = require('./geocoding');

async function getDashboardData(lat, lng) {
    const categories = ['road_damage', 'traffic', 'public_transit', 'road_closures', 'whats_happening'];
    
    const [weatherData, airData, areaName] = await Promise.all([
        weather.getWeather(lat, lng),
        airQuality.getAirQuality(lat, lng),
        geocoding.reverseGeocode(lat, lng).catch(() => 'Unknown Location')
    ]);

    const synthData = categories.map(cat => synthetic.getSyntheticData(cat, lat, lng));

    return {
        location: {
            lat,
            lng,
            area_name: areaName
        },
        timestamp: new Date().toISOString(),
        categories: [
            weatherData,
            airData,
            ...synthData
        ].filter(Boolean)
    };
}

async function getCategoryData(name, lat, lng) {
    if (name === 'weather') return await weather.getWeather(lat, lng);
    if (name === 'air_quality') return await airQuality.getAirQuality(lat, lng);
    return synthetic.getSyntheticData(name, lat, lng);
}

module.exports = { getDashboardData, getCategoryData };
