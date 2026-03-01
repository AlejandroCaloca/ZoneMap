
# ZoneMap

Crowdsourced, real‑time civilian threat-awareness map. ZoneMap is a PWA that lets community members pin incidents on a live map for immediate local visibility. No accounts, no PII, anonymous by design.

---

## Project Status

**Phase 1 — Map Shell (in progress):**
- Vite app scaffolded
- MapLibre GL JS integrated
- Dark map style configured
- Hardcoded demo pins rendering with correct colors
- Map UI layout (top bar + bottom controls)

---

## Tech Stack (v1)

- **Map rendering:** MapLibre GL JS  
- **Tiles:** OpenStreetMap (style configured via `.env`)  
- **Build tooling:** Vite  
- **Language:** Vanilla JavaScript + CSS  

---

## Getting Started (Ubuntu / Linux)

### 1) Clone the repo
```bash
mkdir -p ~/projects
cd ~/projects
git clone https://github.com/AlejandroCaloca/ZoneMap.git
cd ZoneMap
```

### 2) Install dependencies
```bash
npm install
```

### 3) Start the dev server
```bash
npm run dev
```

Vite will output a local URL (usually `http://localhost:5173`). Open it in your browser.

---

## Environment Config

The app uses Vite environment variables to configure the map style.

- `.env.development` → local style (usually a local JSON file)
- `.env.production` → public tile provider style URL

If the map doesn’t load, verify the `VITE_MAP_STYLE` value.

---

## Phase 1 Verification Checklist

When Phase 1 is complete, you should see:

- A **dark basemap**
- A **top bar** with “⚠ ZONEMAP” and “+ REPORT”
- **Bottom controls** for “📍 My Location” and “🔍 Filter”
- **Hardcoded pins** rendered in color:
  - Red = High severity
  - Yellow = Medium severity
  - Green = Low severity
- Clicking a pin opens a popup with mock incident info

---

## Folder Structure

```
ZoneMap/
├─ index.html
├─ src/
│  ├─ main.js
│  └─ style.css
├─ public/
├─ package.json
├─ .env.development
├─ .env.production
```

---

## Next Phases (Roadmap)

**Phase 2 — Gun.js P2P Data**
- Real-time sync
- Relay connection
- Read/write pins to Gun

**Phase 3 — Access Control & Anonymization**
- FingerprintJS hash
- Passphrase gate for posting
- Rate limiting + flag system

**Phase 4 — Pin Detail & Media**
- Bottom sheet UX
- Cloudinary uploads
- Mod override tools

**Phase 5 — Supabase Snapshot**
- Periodic backups
- Cold-start recovery

**Phase 6 — PWA & Polish**
- Offline support
- Installable PWA
- Optional push notifications

---

## License

See [LICENSE](./LICENSE).