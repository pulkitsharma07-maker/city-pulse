const fs = require('fs');
const path = require('path');
const cache = require('./cache');

// Dummy location matching for Jaipur based on rough coords
// Jaipur: 26.9124, 75.7873
function identifyCity(lat, lng) {
    if (lat > 26.8 && lat < 27.1 && lng > 75.6 && lng < 76.0) return 'jaipur';
    if (lat > 28.4 && lat < 28.9 && lng > 76.8 && lng < 77.4) return 'delhi';
    if (lat > 18.8 && lat < 19.3 && lng > 72.7 && lng < 73.0) return 'mumbai';
    if (lat > 12.8 && lat < 13.2 && lng > 77.4 && lng < 77.8) return 'bengaluru';
    return 'defaults';
}

function getSyntheticData(category, lat, lng) {
    const city = identifyCity(lat, lng);
    const dataPath = path.join(__dirname, `../data/seeds/${city}.json`);
    
    let seedData;
    try {
        seedData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } catch (e) {
        seedData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/seeds/defaults.json'), 'utf8'));
    }

    // Deterministic drift
    const hour = new Date().getHours();
    const hash = Math.floor(lat * 100 + lng * 100) % 10;
    const modifier = (hour + hash) % 5;

    const defaultsPath = path.join(__dirname, '../data/seeds/defaults.json');
    const defaultsData = JSON.parse(fs.readFileSync(defaultsPath, 'utf8')).defaults;

    const baseData = seedData[category] || defaultsData[category];
    if (!baseData) return null;
    
    return {
        category,
        ...baseData,
        timestamp: new Date().toISOString()
    };
}

function getHistory(category, lat, lng, range) {
    const city = identifyCity(lat, lng);
    const historyPath = path.join(__dirname, `../data/history/${city}-history.json`);
    try {
        const histData = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
        return histData[category] || [];
    } catch (e) {
        return [];
    }
}

module.exports = { getSyntheticData, getHistory };
