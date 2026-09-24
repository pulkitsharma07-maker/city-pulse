const express = require('express');
const router = express.Router();
const geocoding = require('../services/geocoding');

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query q is required' });
    const data = await geocoding.forwardGeocode(q);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Forward geocode failed' });
  }
});

module.exports = router;
