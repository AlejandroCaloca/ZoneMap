import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './style.css';

// ---------------------------------------------------------------------------
// Hardcoded demo pins for Phase 1 (no data layer yet)
// ---------------------------------------------------------------------------
const DEMO_PINS = [
  {
    id: 'pin-1',
    lat: 37.7749,
    lng: -122.4194,
    category: 'crime',
    severity: 'high',
    description: 'Two individuals near 3rd & Main, one fled south.',
    timestamp: Date.now() - 4 * 60 * 1000, // 4 minutes ago
    status: 'active',
  },
  {
    id: 'pin-2',
    lat: 37.7765,
    lng: -122.4160,
    category: 'suspicious',
    severity: 'medium',
    description: 'Suspicious vehicle parked for over an hour.',
    timestamp: Date.now() - 12 * 60 * 1000,
    status: 'active',
  },
  {
    id: 'pin-3',
    lat: 37.7732,
    lng: -122.4220,
    category: 'hazard',
    severity: 'low',
    description: 'Broken streetlight at intersection.',
    timestamp: Date.now() - 30 * 60 * 1000,
    status: 'active',
  },
];

// ---------------------------------------------------------------------------
// Map initialisation
// ---------------------------------------------------------------------------
// Style is configured per environment via VITE_MAP_STYLE:
//   .env.development → /dark-style.json  (local fallback, no network required)
//   .env.production  → Carto Dark Matter (free, no API key required)
const map = new maplibregl.Map({
  container: 'map',
  style: import.meta.env.VITE_MAP_STYLE,
  center: [-122.4194, 37.7749], // San Francisco (matches demo pins)
  zoom: 14,
  attributionControl: false,
});

// Compact attribution so it doesn't clutter the dark UI
map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

// Navigation controls (zoom +/-)
map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');

// ---------------------------------------------------------------------------
// Render demo pins after map loads
// ---------------------------------------------------------------------------

//
map.on('load', () => {
  // Give the browser one frame to layout the container
  requestAnimationFrame(() => {
    map.resize();
    DEMO_PINS.forEach((pin) => addPinMarker(pin));
  });
});
//


window.addEventListener('resize', () => {
  map.resize();
});

/**
 * Creates a DOM-based pulsing marker for a pin and adds it to the map.
 * @param {object} pin
 */
function addPinMarker(pin) {
  //log for debuggin pins, remove afterwards
  console.log('adding pin', pin.id);

  const el = document.createElement('div');
  el.className = `pin-marker ${pin.severity}`;
  el.title = `${pin.category.toUpperCase()} — ${pin.severity}`;

  const marker = new maplibregl.Marker({ element: el })
    .setLngLat([pin.lng, pin.lat])
    .setPopup(buildPopup(pin))
    .addTo(map);

  // Open popup on click of the marker element
  el.addEventListener('click', () => marker.togglePopup());

}

/**
 * Builds a MapLibre Popup for a pin.
 * @param {object} pin
 * @returns {maplibregl.Popup}
 */
function buildPopup(pin) {
  const minutesAgo = Math.round((Date.now() - pin.timestamp) / 60000);
  const severityLabel = pin.severity.charAt(0).toUpperCase() + pin.severity.slice(1);
  const categoryLabel = pin.category.charAt(0).toUpperCase() + pin.category.slice(1);

  const html = `
    <div class="popup-inner">
      <div class="popup-header severity-${pin.severity}">
        🔴 ACTIVE — ${severityLabel.toUpperCase()} SEVERITY
      </div>
      <div class="popup-meta">Category: ${categoryLabel}</div>
      <div class="popup-meta">Reported ${minutesAgo} min${minutesAgo !== 1 ? 's' : ''} ago</div>
      <hr class="popup-divider" />
      <p class="popup-desc">${pin.description}</p>
      <button class="popup-flag-btn" data-id="${pin.id}">⚑ Flag as inaccurate</button>
    </div>
  `;

  return new maplibregl.Popup({
    closeButton: true,
    closeOnClick: false,
    className: 'zonemap-popup',
    maxWidth: '280px',
  }).setHTML(html);
}