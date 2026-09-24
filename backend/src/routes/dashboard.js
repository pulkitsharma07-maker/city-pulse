const express = require('express');
const router = express.Router();
const aggregator = require('../services/aggregator');

router.get('/', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: 'lat and lng are required' });
    }
    const data = await aggregator.getDashboardData(parseFloat(lat), parseFloat(lng));
    res.json(data);
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
