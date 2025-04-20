"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { Spinner } from "../ui/spinner";
import { DonationWithDonor } from "@/@types";

// Props for the Map component
interface MapProps {
  donations?: DonationWithDonor[];
  singleDonation?: DonationWithDonor;
}

// Map container styling
const containerStyle = {
  width: "100%",
  height: "500px",
};

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
  // Load the Google Maps script with Places library
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: ["places"], // Add Places library
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchCenter, setSearchCenter] =
    useState<google.maps.LatLngLiteral | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  // Define custom icon only when Google Maps is loaded
  const customIcon = useMemo(() => {
    if (!isLoaded) return undefined; // Return undefined until loaded
    return {
      url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      scaledSize: new google.maps.Size(40, 40),
    };
  }, [isLoaded]);

  // Determine which data to use
  const isSingleMode = !!singleDonation;
  const baseMarkersData = isSingleMode ? [singleDonation] : donations;

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

  // Calculate the center
  const center = useMemo(() => {
    if (searchCenter) return searchCenter; // Use search center if set
    if (markersData.length === 0) return defaultCenter;
    const avgLat =
      markersData.reduce((sum, d) => sum + d.location.lat, 0) /
      markersData.length;
    const avgLng =
      markersData.reduce((sum, d) => sum + d.location.lng, 0) /
      markersData.length;
    return { lat: avgLat, lng: avgLng };
  }, [markersData, searchCenter]);

  // Handle map load and fit bounds
  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      setMap(mapInstance);

      if (markersData.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markersData.forEach((donation) => {
          bounds.extend({
            lat: donation.location.lat,
            lng: donation.location.lng,
          });
        });
        mapInstance.fitBounds(bounds);

        if (isSingleMode) {
          setTimeout(() => mapInstance.setZoom(15), 100); // Zoom for single donation
        }
      }
    },
    [markersData, isSingleMode]
  );

  // Handle search box load
  const onSearchBoxLoad = useCallback(
    (searchBox: google.maps.places.SearchBox) => {
      searchBoxRef.current = searchBox;
    },
    []
  );

  // Handle place selection
  const onPlacesChanged = useCallback(() => {
    const searchBox = searchBoxRef.current;
    if (!searchBox) return;

    const places = searchBox.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = place.geometry?.location;
      if (location) {
        const newCenter = { lat: location.lat(), lng: location.lng() };
        setSearchCenter(newCenter);
        map?.panTo(newCenter); // Move map to searched location
      }
    }
  }, [map]);

  // Clean up on unmount
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (loadError) {
    return <div>Error loading map. Please try again later.</div>;
  }

  if (!isLoaded) {
    return <Spinner type="circle" size="xl" />;
  }

  return (
    <div style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markersData.map((donation) => (
          <MarkerF
            key={donation._id}
            position={{
              lat: donation.location.lat,
              lng: donation.location.lng,
            }}
            title={donation.title}
            icon={customIcon}
          />
        ))}
      </GoogleMap>
      <StandaloneSearchBox
        onLoad={onSearchBoxLoad}
        onPlacesChanged={onPlacesChanged}
      >
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a location"
              className="w-full h-12 px-4 pl-10 text-base bg-white border-0 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </StandaloneSearchBox>
    </div>
  );
}
