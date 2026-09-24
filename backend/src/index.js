const express = require('express');
const cors = require('cors');

const dashboardRoutes = require('./routes/dashboard');
const categoryRoutes = require('./routes/category');
const historyRoutes = require('./routes/history');
const geocodeRoutes = require('./routes/geocode');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/history', historyRoutes);
app.use('/api/v1/geocode', geocodeRoutes);

app.get('/api/v1/reverse-geocode', async (req, res) => {
    try {
        const { lat, lng } = req.query;
        if (!lat || !lng) return res.status(400).json({ error: 'lat and lng required' });
        const geocoding = require('./services/geocoding');
        const areaName = await geocoding.reverseGeocode(lat, lng);
        res.json({ area_name: areaName });
    } catch (e) {
        res.status(500).json({ error: 'Reverse geocode failed' });
    }
});

app.get('/api/v1/ip-locate', async (req, res) => {
    try {
        const response = await axios.get('http://ip-api.com/json/');
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'IP locate failed' });
    }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
