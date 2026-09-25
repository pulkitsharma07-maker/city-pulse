# 🌆 City Pulse — Real-Time Hyperlocal Urban Intelligence Dashboard

> **AmiHacks 1.0 Hackathon Project**  
> **Team Name:** Syntax Error  
> **Team ID:** T193  
> **Team Members:** Pulkit Sharma, Sneha Kanwar, Rohan Dani, Avni Mathur  
> **Live Demo:** [https://city-pulse-nu.vercel.app](https://city-pulse-nu.vercel.app)

---

## 📌 Problem Statement
Citizens frequently navigate multiple disjointed applications to track weather, check air pollution indices, assess road traffic, and monitor localized municipal disruptions. There is no unified, glanceable dashboard providing neighborhood-level awareness tailored to an Indian urban context.

## 💡 Solution
**City Pulse** is a single-pane-of-glass urban intelligence dashboard that aggregates real-time environmental and municipal data:
- **Instant Hyperlocal Data:** Displays real-time weather, particulate pollution (PM2.5/PM10), and transit conditions based on user geolocation or searched landmarks.
- **Interactive Geospatial Visualization:** Leaflet-powered GIS mapping displaying incident hotspots, air quality stations, and traffic disruptions.
- **Multilingual Support:** Built-in localization support for Hindi, English, and regional languages.
- **Accessibility & Contrast:** Dynamic scaling typography and high-contrast rendering modes for inclusive usability.
- **Progressive Web App (PWA):** Installs natively on mobile devices for seamless on-the-go monitoring.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS with custom glassmorphism design system
- **Mapping:** Leaflet.js with ArcGIS canvas basemaps
- **Icons:** Lucide React
- **State Management:** React Context API (`LocationContext`, `LanguageContext`, `AccessibilityContext`)

### Backend
- **Runtime:** Node.js with Express
- **API Services:** 
  - [Open-Meteo Weather API](https://open-meteo.com) for real-time temperature, wind, and conditions
  - [OpenAQ / Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) for US-AQI, PM2.5, and PM10
  - [Komoot Photon Geocoding API](https://photon.komoot.io) for forward/reverse geolocation lookups
- **Caching Layer:** In-memory TTL caching to optimize external request quotas
- **Deployment:** Vercel Edge Serverless Monorepo

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pulkitsharma07-maker/city-pulse.git
   cd city-pulse
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

1. **Start the Backend Server (Port 5000):**
   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend Development Server (Port 5173):**
   ```bash
   cd ../frontend
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/dashboard?lat={lat}&lng={lng}` | `GET` | Aggregated dashboard feed for given coordinates |
| `/api/geocode/search?q={query}` | `GET` | Forward geocoding search for landmark/city |
| `/api/geocode/reverse?lat={lat}&lng={lng}` | `GET` | Reverse geocoding to retrieve human-readable area name |
| `/api/history?city={city}` | `GET` | Multi-day historical telemetry for trends |

---

## 👥 Team Syntax Error (T193)
- **Pulkit Sharma** — Frontend Architecture & State Management
- **Sneha Kanwar** — UI/UX Engineering & Design System
- **Rohan Dani** — API Aggregation & Backend Microservices
- **Avni Mathur** — Geospatial Mapping & Quality Assurance
