const fs = require('fs');
const path = require('path');

const hiPath = path.join(__dirname, 'frontend/src/i18n/hi.json');
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

hi.detail_keys = {
  "reports": "रिपोर्ट",
  "routes": "मार्ग",
  "lines": "ट्रांजिट लाइनें",
  "closures": "बंद रास्ते",
  "items": "आइटम",
  "speed_kmh": "गति (किमी/घंटा)",
  "reason": "कारण",
  "location": "स्थान",
  "severity": "गंभीरता",
  "type": "प्रकार",
  "time": "समय",
  "description": "विवरण",
  "title": "शीर्षक",
  "name": "नाम",
  "note": "नोट",
  "expected_until": "कब तक",
  "humidity": "नमी",
  "dominant": "मुख्य प्रदूषक",
  "recommendation": "सिफारिश"
};

fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2));
