const axios = require('axios');
const cache = require('./cache');
const statusMapper = require('../utils/statusMapper');

async function getWeather(lat, lng) {
    const cacheKey = `weather_${lat.toFixed(2)}_${lng.toFixed(2)}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code`;
        const response = await axios.get(url);
        const data = response.data.current;
        
        const code = data.weather_code;
        let icon = 'sun';
        if (code >= 51 && code <= 67) icon = 'rain';
        if (code >= 3) icon = 'cloud';
        
        const result = {
            category: "weather",
            icon: icon, // no status dot
            status: null,
            value: { temp: data.temperature_2m, code },
            summary: `${data.temperature_2m}°C`,
            detail: { humidity: "N/A" },
            source: { type: "real", name: "Open-Meteo Weather API" },
            timestamp: new Date().toISOString(),
            ai_blurb: "Perfect weather for an evening stroll."
        };
        cache.set(cacheKey, result);
        return result;
    } catch (e) {
        return null;
    }
}

module.exports = { getWeather };
