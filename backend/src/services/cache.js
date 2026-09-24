const NodeCache = require('node-cache');
// 10 minutes TTL
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

module.exports = cache;
