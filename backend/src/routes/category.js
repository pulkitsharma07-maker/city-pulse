const express = require('express');
const router = express.Router();
const aggregator = require('../services/aggregator');

router.get('/:name', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const { name } = req.params;
    if (!lat || !lng) {
      return res.status(400).json({ error: 'lat and lng are required' });
    }
    const data = await aggregator.getCategoryData(name, parseFloat(lat), parseFloat(lng));
    if (!data) {
        return res.status(404).json({ error: 'Category not found' });
    }
    res.json(data);
  } catch (error) {
    console.error('Category Error:', error);
    res.status(500).json({ error: 'Failed to fetch category data' });
  }
});

module.exports = router;
