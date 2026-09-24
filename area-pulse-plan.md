# Area Pulse — Product & Architecture Plan

> A hyperlocal awareness dashboard for India. Shows air quality, road conditions, traffic, weather, transit, closures, and "what's happening nearby" — for any location, understandable by anyone in 10 seconds.

---

## 1. Product Vision

**One-liner:** A single page that tells anyone — tech-savvy or not, young or old — what's going on around their location right now, why it matters, and lets them dig deeper only if they want to.

**Core design principle:** *Glanceable first, detailed on demand.* The default view must require zero interaction to understand. Every additional layer of detail is opt-in via a clearly labeled button/tap.

**Target audience:** General public in India, explicitly including elderly and non-tech-literate users, while still offering enough depth (maps, historical trends, source data) to satisfy technical users and hackathon judges.

**Constraints:**
- 100% open source (open-source libraries/frameworks only, no proprietary paid APIs required to run the demo)
- Must degrade gracefully — missing data should never look broken, and should not be obvious to a casual/non-technical user
- Hackathon context — synthetic data is acceptable and expected for categories without free public data, but must be subtly and honestly labeled
- India-focused, with Jaipur as the flagship richly-seeded demo city

---

## 2. Two Deliverables

Build **two separate applications** from a shared design system and shared backend/data layer:

1. **Web App** (primary deliverable) — responsive, works on any modern browser, mobile and desktop.
2. **Native/Installable Application** — the builder has full freedom to choose the best-fitting approach (e.g., a PWA wrapped as installable, Electron/Tauri desktop app, or a Flutter/React Native app) — whichever best reuses the web app's code and design with least duplication. If a PWA-based installable app satisfies this with minimal extra work, prefer that for hackathon time constraints.

Both consume the same backend API and normalized data format described below.

---

## 3. Information Architecture

### 3.1 Layout: Tabbed, single dashboard

- **Top bar:** Hamburger/menu icon (top-left), app name/logo (center or left), current location display + edit control (top-right), search bar.
- **Tabs (below top bar):** One tab per major mode:
  1. **Overview** (default) — card grid, all categories at a glance
  2. **Map** — pins-on-map view, all categories togglable
  3. **History** — 7-day / 1-3 month trends per category
- **Side menu (slides in from left on hamburger tap):**
  - Language selector (see §7)
  - About / How it works
  - Data sources & credits (lists which categories are real vs. synthetic, and their origin)
  - Accessibility settings — font size toggle, high-contrast toggle (build these functional, not placeholders)
  - Theme info (optional light note, e.g., "About this design")

### 3.2 Overview tab (the core "10-second" view)

A responsive card grid, one card per category:

| Card | Status Indicator | Quick Info | Expand Reveals |
|---|---|---|---|
| Air Quality | Color-coded dot/gauge (green→red, AQI scale) | AQI number + 1-word label (Good/Moderate/Poor/etc.) | Pollutant breakdown (PM2.5, PM10, etc.), trend sparkline, AI blurb on health impact |
| Road Damage | Color-coded severity dot | Count of reported issues nearby (e.g., "3 potholes, 2 streetlights down") | List of specific issues with mini-map thumbnail, severity, distance |
| Traffic | Color-coded congestion dot | Plain text ("Light traffic" / "Heavy congestion on MG Road") | Route-level detail, incident list |
| Weather | Icon (sun/rain/cloud) not a dot | Temp + condition | Hourly/extended forecast |
| Public Transit | Color-coded status dot | "Running normally" / "Delays on Route 12" | Line-by-line status |
| Road Closures | Color-coded dot (or "None" state) | Count + nearest closure | List with location, reason, expected duration |
| What's Happening Nearby | No status dot — icon per event type | Headline of top 1-2 items | Full list of nearby news/events/incidents, each with a plain-language "why this matters" AI blurb |

**Status indicator legend:** green = normal/good, amber = caution/moderate, red = significant/poor, grey = data unavailable (see §5 Fallback Handling). This same 4-state system applies uniformly to every card that has a natural severity scale (Air Quality, Road Damage, Traffic, Transit, Closures). Weather and "What's Happening" use icons instead, since they don't map cleanly to a severity scale.

Each card: title, icon, status indicator, 1-line summary, "View more" button. Expanding can be an inline accordion (preferred for the "no navigation needed" feel) or a modal — builder's choice, but inline accordion is recommended to avoid disorienting older users.

### 3.3 Map tab

- Single interactive map (Leaflet + OpenStreetMap tiles — open source, free) centered on user's location.
- All issue types (air quality zones, road damage, traffic incidents, closures, transit stops, events) shown as pins on ONE map.
- A filter panel/legend (small, collapsible) lets users show/hide each category's pins independently.
- Tapping a pin opens a small info panel/card with the same plain-language summary + expand-for-detail pattern as the Overview cards.

### 3.4 History tab

- Category selector (tabs or dropdown) to pick which data type to view historically.
- Time range toggle: **Past 7 Days** / **Past 1 Month** / **Past 3 Months**.
- Each view shows:
  - A simple, clean line or bar chart (open-source charting lib, e.g. Chart.js or Recharts) — decently detailed with axis labels, tooltips on hover/tap, not oversimplified, since users who open this tab are assumed comfortable with a bit more data.
  - One plain-language summary line above the chart (e.g., "Air quality was Moderate on average this week, peaking on Tuesday evening.")
- Historical data may be synthetic (seeded, not randomly regenerated on every load — see §6.3) but should look continuous and plausible.

---

## 4. Category Definitions & Data Sourcing (India-focused)

| Category | Preferred Real Source (Open/Free, India) | Fallback | Notes |
|---|---|---|---|
| Air Quality | [OpenAQ API](https://openaq.org) (has Indian monitoring stations), or CPCB (Central Pollution Control Board) public data where accessible | Synthetic, seeded per city | Show AQI + PM2.5/PM10 breakdown where available |
| Weather | [Open-Meteo API](https://open-meteo.com) (fully free, no key required, good India coverage) | N/A — this one should almost always be real | High reliability real source; use this as the "always works" anchor category |
| Road Damage (potholes, streetlights) | No reliable free India-wide open API exists | **Synthetic by design** (per hackathon scope — explicitly NOT crowdsourced) | Richly seeded for Jaipur + a few famous places; sparse plausible synthetic data elsewhere |
| Traffic | No open free real-time India traffic API without a paid key | **Synthetic**, patterned to be plausible (e.g., worse at rush hours) | Optionally: if a free-tier option is later added (e.g., TomTom free tier), architecture should allow swapping in easily |
| Public Transit | Varies by city; some cities (Delhi Metro, etc.) have GTFS feeds where public | **Synthetic** for most locations, real GTFS static data for Delhi/major metros if time permits | Keep as stretch goal for real data |
| Road Closures | Municipal sources rarely open; treat as synthetic | Synthetic | Tie into same seeded dataset as Road Damage |
| What's Happening Nearby | News: could use an open news API (e.g., [NewsData.io](https://newsdata.io) free tier, or RSS feeds from Indian news sources) filtered by location keywords | Synthetic local "event" generator | AI blurb layer applies regardless of real/synthetic |

**Labeling rule (per your confirmation):** Every card/data point must carry a small, unobtrusive tag indicating its provenance:
- `Live · [Source Name]` for real data (e.g., "Live · Open-Meteo")
- `Demo Data` for synthetic data

This should be a small muted-text label, not a big banner — visible on inspection (e.g., in the expanded card view or a tiny corner tag) without disrupting the clean look.

---

## 5. Graceful Degradation (Missing Data Handling)

**Rule: Never hide a card. Always show the full grid.**

When a data source fails or is unavailable for a location:
- Card remains in its normal position in the grid (layout never shifts/reflows unpredictably).
- Status indicator shows **grey** ("Data unavailable" state), not red (red implies "bad condition," grey implies "we don't know").
- Quick info text reads something calm and human, e.g., *"No data available for this area right now"* — never a technical error message, never "Error 404" or stack traces.
- Expand button either hides or shows a gentle explanation ("We couldn't reach this data source for your area.").
- This must look intentional and calm, not broken — consistent with "the user shouldn't notice/be alarmed."

This applies identically across Overview cards, Map pins (simply don't render a pin for missing data, rather than an error pin), and History (show "Not enough historical data for this period" with an empty-state illustration, not a broken chart).

---

## 6. Data & Backend Architecture

### 6.1 High-level flow

```
[Location Input] → [Backend Aggregator Service] → [Normalizer/Timestamper] → [Unified Data API] → [Frontend (Web + App)]
                          ↑
        [Real APIs: OpenAQ, Open-Meteo, News API, GTFS...]
        [Synthetic Data Generator: seeded per-city datasets]
```

### 6.2 Backend responsibilities
- **Location resolution:** Accept browser geolocation (lat/lng) OR IP-based fallback (use a free/open IP geolocation service, e.g., ip-api.com free tier) OR manual text search. Reverse-geocode to a human-readable area name using an open service (e.g., Nominatim/OpenStreetMap).
- **Aggregation layer:** For each category, call the appropriate real API if available for that location; otherwise pull from the synthetic dataset keyed by nearest seeded location.
- **Normalization:** Convert every source's data into one shared internal schema per category (see §6.4) — consistent units, consistent severity scale (map each source's native scale to the shared 4-state green/amber/red/grey system), and a timestamp of when it was fetched/generated.
- **Caching:** Cache real API responses briefly (e.g., 5–15 min) to avoid rate-limit issues and to satisfy the "don't change every refresh" requirement.
- **AI Blurb Generation:** A lightweight LLM call (can use an open-source model served locally/via free inference, e.g., a small open model, or if permitted, any available LLM API) takes the normalized data point and generates a short (1–2 sentence) plain-language "why it matters" blurb, tone = mix of factual civic-notice clarity and warm approachability. Cache these too (don't regenerate every request — regenerate only when underlying data meaningfully changes).

### 6.3 Synthetic data strategy (important — must NOT feel random on refresh)

- Synthetic data is **pre-generated and stored** (e.g., in a local JSON/SQLite dataset seeded at build time or on first run), not generated fresh on every page load.
- A scheduled/background job (e.g., runs every N minutes, or a simple cron-like interval in the backend) nudges the synthetic values slightly — small realistic drift (e.g., AQI moves ±5 points, traffic shifts with time-of-day patterns) — so the app feels "alive" over a demo session without being jarringly inconsistent between two consecutive refreshes.
- Historical data (7-day / 1-3 month) is generated once as a continuous, plausible time series at seed time (with realistic daily/weekly patterns — e.g., traffic worse on weekday rush hours, AQI worse in winter) and stored, not recomputed per request.
- **Seed richness tiers:**
  1. **Tier 1 (rich, hand-tuned):** Jaipur — multiple specific localities within the city, dense synthetic road-damage/traffic/transit data.
  2. **Tier 2 (moderate):** A handful of famous/major Indian cities (e.g., Delhi, Mumbai, Bengaluru, Jaipur's neighbors) — decent seeded data so judges picking these cities still see a full experience.
  3. **Tier 3 (sparse but present):** Any other location in India — generate plausible but simpler synthetic data on the fly (using reasonable regional defaults) so the app never shows an empty/broken state anywhere in India.

### 6.4 Shared data schema (per category, illustrative)

```json
{
  "category": "air_quality",
  "location": { "lat": 26.9124, "lng": 75.7873, "area_name": "Jaipur, Rajasthan" },
  "status": "amber",
  "value": { "aqi": 142, "pm25": 58, "pm10": 95 },
  "summary": "Moderate — sensitive groups should limit prolonged outdoor exertion.",
  "source": { "type": "synthetic", "name": "Demo Data" },
  "timestamp": "2026-09-24T10:30:00+05:30",
  "ai_blurb": "Air quality here is a bit rough today — if you've got breathing issues, maybe keep the evening walk shorter."
}
```

Every category follows this same shape (status/value/summary/source/timestamp/ai_blurb), which is what makes the frontend simple and consistent, and what makes graceful degradation easy (a missing category is just a record with `status: "grey"` and `source: null`).

---

## 7. Localization

- On load, detect system/browser language automatically.
- Manual override available via the side menu (hamburger → language selector).
- Supported languages at launch: **English, Hindi, Tamil, Telugu**, plus a few more major Indian languages (suggest adding **Bengali, Marathi, Kannada** for good coverage — builder's discretion on exact final list based on time).
- All UI strings and AI-generated blurbs should be localized. For AI blurbs, either generate directly in the target language or translate the generated English blurb — builder's choice based on what's feasible in the time available.

---

## 8. Search Bar Behavior

- Dual-purpose, but should be clearly one input with smart handling:
  - Typing a place name → treated as a **location search** (change location).
  - Typing a category-like term (e.g., "traffic", "air quality") → treated as a **filter/jump-to-category** within the current view (scrolls to / highlights that card, or filters map pins).
- Session-only memory: search history/current search term persists while navigating the app in the same session, but resets on page refresh (no persistent storage, consistent with the anonymous/fresh-start requirement).

---

## 9. Notifications

- Small, unobtrusive **toast/badge** style — appears briefly (e.g., bottom corner or near the relevant card), auto-dismisses, never a blocking modal.
- Trigger only on **meaningful changes**, not routine noise — e.g.:
  - A status indicator crosses a threshold (e.g., Air Quality moves from amber → red)
  - A new significant nearby event appears
  - A road closure newly appears near the user's location
- Should not stack up or spam — cap to one visible notification at a time, queue others quietly.

---

## 10. Visual Design Direction

- **Palette:** Cream/off-white base (e.g., `#F7F3EA` or similar warm neutral), with muted, premium-feeling accent tones for status states — not harsh pure red/green/yellow, but desaturated equivalents (e.g., sage green, warm amber, soft terracotta/red, soft grey) that stay consistent with the "minimalist premium" feel.
- **Typography:** Clean, modern sans-serif (e.g., Inter, or similar open-source webfont) for maximum legibility across ages and languages — avoid decorative/serif fonts that reduce clarity for non-native/elderly readers. Ensure the chosen font has good glyph support for Hindi/Tamil/Telugu/etc. (or pair with a solid Devanagari/Indic webfont fallback).
- **Spacing & hierarchy:** Generous whitespace, large tap targets, clear visual hierarchy (status color + icon do most of the communication, text is secondary confirmation) — this is what makes it "10-second understandable."
- **Icons:** Simple, literal, universally recognizable icon set (e.g., Lucide or Feather icons — both open source) rather than abstract symbols.
- **Motion:** Subtle, minimal transitions (card expand, toast in/out, side menu slide) — nothing flashy, reinforcing the premium-calm feel.

Full creative freedom beyond these anchors — builder should use the `frontend-design` best-practices approach for a distinctive, non-templated look within this direction.

---

## 11. Accessibility (in scope, functional not placeholder)

- Font size toggle (e.g., Small / Normal / Large) — persists for the session.
- High-contrast mode toggle.
- All status information must be conveyed by more than color alone (icon + text label alongside every color dot) for colorblind accessibility.
- Sufficient tap target sizes (min ~44px) throughout, given the older-user audience.

---

## 12. Tech Stack (suggested — builder has final discretion)

- **Frontend:** React (or similar open-source framework) + Tailwind CSS for the design system; Leaflet.js + OpenStreetMap for maps; Chart.js or Recharts for history charts.
- **Backend:** Node.js/Express or Python/FastAPI — either fine, choose whichever integrates more easily with chosen APIs and any AI blurb generation step.
- **Data storage:** Lightweight (SQLite or even structured JSON files) is sufficient for hackathon scope — no need for a heavy database given synthetic + cached-real data volumes.
- **Deployment:** Any open, free-tier-friendly hosting is fine (e.g., Vercel/Netlify for frontend, Render/Railway for backend) — not a hard requirement, builder's call based on hackathon submission needs.
- **Installable app version:** PWA (manifest + service worker) is the fastest path to a second "application" deliverable reusing the same codebase; consider this the default unless the builder has a strong reason to build a separate native app.

---

## 13. Summary of Key Non-Negotiables (quick checklist for the builder)

- [ ] Fully open source stack — no required paid APIs for the demo to run
- [ ] Works flawlessly even with partial/missing data — grey "unavailable" state, never a broken layout or visible error
- [ ] Anonymous, no login, session-only memory (search term resets on refresh)
- [ ] Cream, minimalist, premium visual theme
- [ ] Tabbed layout: Overview / Map / History
- [ ] Status color-coding (green/amber/red/grey) + icon, consistently applied
- [ ] Card-based Overview with inline expand-for-detail
- [ ] Combined map with per-category show/hide toggles
- [ ] History with 7-day and 1–3 month views, real charts, plain-language summary line
- [ ] Language auto-detect + manual switch (English, Hindi, Tamil, Telugu, +more) via left slide-in menu
- [ ] AI-generated "why it matters" blurbs, factual-but-warm tone
- [ ] Synthetic vs. real data clearly (but subtly) labeled, with source name shown for real data
- [ ] Jaipur = richest synthetic dataset; a few major cities = moderate; rest of India = sparse-but-functional
- [ ] Synthetic data is stable/seeded, drifts slowly over time — never randomizes on every refresh
- [ ] Toast/badge-style notifications only for meaningful changes, non-intrusive
- [ ] Functional accessibility settings: font size + high contrast
- [ ] Two deliverables: responsive web app + installable app (PWA or best-fit alternative) from shared codebase/design
