const axios = require('axios');
const cache = require('./cache');
const statusMapper = require('../utils/statusMapper');

async function getAirQuality(lat, lng) {
    const cacheKey = `aqi_${lat.toFixed(2)}_${lng.toFixed(2)}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
        const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&current=us_aqi,pm2_5,pm10`;
        const response = await axios.get(url);
        const data = response.data.current;
        
        const aqi = data.us_aqi;
        let status = 'green';
        if (aqi > 50) status = 'amber';
        if (aqi > 100) status = 'red';

        const result = {
            category: "air_quality",
            icon: "wind",
            status: status,
            value: { aqi, pm2_5: data.pm2_5, pm10: data.pm10 },
            summary: `Current AQI is ${aqi}`,
            detail: { dominant: 'PM2.5', recommendation: aqi > 100 ? 'Wear a mask' : 'Enjoy the outdoors' },
            source: { type: "real", name: "Open-Meteo Air Quality API" },
            timestamp: new Date().toISOString(),
            ai_blurb: aqi <= 50 ? "The air is fresh and clear today." : "Pollution levels are noticeable, take care."
        };
        cache.set(cacheKey, result);
        return result;
    } catch (e) {
        return null;
    }
}

module.exports = { getAirQuality };
