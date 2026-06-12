"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import { DonationWithDonor } from "@/@types";

// Props for the Map component
interface MapProps {
  donations?: DonationWithDonor[];
  singleDonation?: DonationWithDonor;
}

interface GeoapifyFeature {
  properties: {
    lat: number;
    lon: number;
    formatted: string;
  };
}

const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY || "";
const MAP_STYLE = `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${GEOAPIFY_API_KEY}`;

// Default center (fallback)
const defaultCenter = {
  lat: 37.7749, // San Francisco
  lng: -122.4194,
};

// Radius for filtering donations (in meters)
const SEARCH_RADIUS = 50000; // 50 km

// Haversine formula to calculate distance between two points (in meters)
function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function Map({ donations = [], singleDonation }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const [mapReady, setMapReady] = useState(false);
  const [searchCenter, setSearchCenter] =
    useState<{ lat: number; lng: number } | null>(null);

  // Determine which data to use
  const isSingleMode = !!singleDonation;
  const baseMarkersData = useMemo(() => {
    return isSingleMode ? [singleDonation!] : donations;
  }, [isSingleMode, singleDonation, donations]);

  // Filter donations based on search center
  const markersData = useMemo(() => {
    if (!searchCenter || isSingleMode) return baseMarkersData; // No filtering in single mode
    return baseMarkersData.filter((donation) => {
      const distance = getDistance(
        searchCenter.lat,
        searchCenter.lng,
        donation.location.lat,
        donation.location.lng
      );
      return distance <= SEARCH_RADIUS;
    });
  }, [baseMarkersData, searchCenter, isSingleMode]);

  // Initial center (fitBounds adjusts the view once markers are added)
  const initialCenter = useMemo(() => {
    if (baseMarkersData.length === 0) return defaultCenter;
    const avgLat =
      baseMarkersData.reduce((sum, d) => sum + d.location.lat, 0) /
      baseMarkersData.length;
    const avgLng =
      baseMarkersData.reduce((sum, d) => sum + d.location.lng, 0) /
      baseMarkersData.length;
    return { lat: avgLat, lng: avgLng };
    // Only used for the very first map initialization.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize the MapLibre map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [initialCenter.lng, initialCenter.lat],
      zoom: 10,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.on("load", () => setMapReady(true));
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      setMapReady(false);
    };
  }, [initialCenter]);

  // Render markers + fit bounds whenever the filtered data changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    // Clear previous markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    markersData.forEach((donation) => {
      const marker = new maplibregl.Marker({ color: "#15803d" })
        .setLngLat([donation.location.lng, donation.location.lat])
        .setPopup(new maplibregl.Popup({ offset: 24 }).setText(donation.title))
        .addTo(map);
      markersRef.current.push(marker);
    });

    if (markersData.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      markersData.forEach((donation) => {
        bounds.extend([donation.location.lng, donation.location.lat]);
      });
      map.fitBounds(bounds, {
        padding: 60,
        maxZoom: isSingleMode ? 15 : 14,
        duration: 0,
      });
    }
  }, [markersData, mapReady, isSingleMode]);

  // Mount the Geoapify autocomplete search box
  useEffect(() => {
    const container = searchContainerRef.current;
    if (!container) return;

    const autocomplete = new GeocoderAutocomplete(
      container,
      GEOAPIFY_API_KEY,
      {
        placeholder: "Search for a location",
        lang: "en",
        limit: 5,
      }
    );

    autocomplete.on("select", (location: GeoapifyFeature | null) => {
      if (!location) return;
      const newCenter = {
        lat: location.properties.lat,
        lng: location.properties.lon,
      };
      setSearchCenter(newCenter);
      mapRef.current?.flyTo({ center: [newCenter.lng, newCenter.lat] });
    });

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px" }}
      />
      <div
        ref={searchContainerRef}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4"
      />
    </div>
  );
}
