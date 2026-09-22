import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Restaurant } from "../types/restaurant";

interface MapViewProps {
  restaurants: Restaurant[];
  onSelect?: (restaurant: Restaurant) => void;
}

/**
 * Builds a small colored pin as a Leaflet divIcon (green = open, clay = closed)
 * so we don't depend on leaflet's default marker image assets, which
 * commonly break under CRA/webpack bundling.
 */
function buildPinIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <svg width="28" height="36" viewBox="0 0 24 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.2 0 11.8 0 21 12 30 12 30s12-9 12-18.2C24 5.2 18.6 0 12 0Z" fill="${color}"/>
        <circle cx="12" cy="11.5" r="5" fill="#FFFFFF"/>
      </svg>
    `,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -32],
  });
}

const openIcon = buildPinIcon("#2F6F4E");
const closedIcon = buildPinIcon("#B45309");

/** Geographic center of the contiguous US — a neutral fallback, not tied to any restaurant. */
const FALLBACK_CENTER: [number, number] = [39.8283, -98.5795];
const FALLBACK_ZOOM = 4;
const LOCATED_ZOOM = 13;

/**
 * Leaflet's <MapContainer center> only sets the INITIAL view — it won't
 * re-pan the map on its own when `center`/`zoom` change later (e.g. once
 * geolocation resolves after first render). This small helper uses
 * react-leaflet's useMap() to imperatively re-center when they do.
 */
function RecenterOnChange({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center[0], center[1], zoom]);
  return null;
}

export default function MapView({ restaurants, onSelect }: MapViewProps) {
  const [center, setCenter] = useState<[number, number]>(FALLBACK_CENTER);
  const [zoom, setZoom] = useState(FALLBACK_ZOOM);

  useEffect(() => {
    // Proposal: "Location (if customer grants location permission)" —
    // center the map on the customer's real position when they allow it.
    // Falls back to a neutral, non-restaurant-specific view otherwise.
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
        setZoom(LOCATED_ZOOM);
      },
      () => {
        // Permission denied or unavailable — keep the fallback view.
      },
    );
  }, []);

  return (
    <div className="relative isolate w-full h-[560px] rounded-[20px] overflow-hidden border border-border-strong">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <RecenterOnChange center={center} zoom={zoom} />
        {/*
          TODO(backend): tile source is OpenStreetMap (free, no key needed).
          If the team later wants a different provider (Mapbox, Google Maps),
          swap the TileLayer url/attribution here only.
        */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*
          TODO(backend): restaurants is [] until GET /api/restaurants is
          wired up (see src/data/mockRestaurants.ts). Pins will appear here
          automatically once that returns real rows with lat/lng.
        */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.lat, restaurant.lng]}
            icon={restaurant.status === "Open" ? openIcon : closedIcon}
            eventHandlers={{
              click: () => onSelect?.(restaurant),
            }}
          >
            <Popup>
              <div className="font-body">
                <p className="font-semibold text-ink m-0">{restaurant.name}</p>
                <p className="text-sm text-muted-2 m-0">
                  {restaurant.cuisine} · {restaurant.priceLevel}
                </p>
                <p className="text-sm m-0">
                  {restaurant.status === "Open" ? "Open now" : "Closed"}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
