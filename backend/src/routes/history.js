const express = require('express');
const router = express.Router();
const synthetic = require('../services/synthetic');

router.get('/:category', (req, res) => {
  try {
    const { lat, lng, range = '7d' } = req.query;
    const { category } = req.params;
    if (!lat || !lng) {
      return res.status(400).json({ error: 'lat and lng are required' });
    }
    const data = synthetic.getHistory(category, parseFloat(lat), parseFloat(lng), range);
    res.json(data);
  } catch (error) {
    console.error('History Error:', error);
    res.status(500).json({ error: 'Failed to fetch history data' });
  }
});

module.exports = router;
