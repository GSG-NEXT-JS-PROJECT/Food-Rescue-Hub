"use client";

import React, { FC, useEffect, useRef } from "react";
import { GeocoderAutocomplete } from "@geoapify/geocoder-autocomplete";
import { ErrorMessage } from "formik";
import useGooglePlacesAutocomplete from "./hooks/useGooglePlacesAutocomplete";

interface GooglePlacesAutocompleteProps {
  defaultAddress?: string;
  className?: string;
  isLabelRemoved?: boolean;
}

interface GeoapifyFeature {
  properties: {
    lat: number;
    lon: number;
    formatted: string;
  };
}

const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY || "";

const GooglePlacesAutocomplete: FC<GooglePlacesAutocompleteProps> = ({
  defaultAddress,
  className = "",
  isLabelRemoved = false,
}) => {
  const { setLocation } = useGooglePlacesAutocomplete();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const autocomplete = new GeocoderAutocomplete(
      container,
      GEOAPIFY_API_KEY,
      {
        placeholder: "Enter or select a location",
        lang: "en",
        limit: 5,
      }
    );

    if (defaultAddress) {
      autocomplete.setValue(defaultAddress);
    }

    autocomplete.on("select", (location: GeoapifyFeature | null) => {
      if (!location) return;
      setLocation({
        lat: location.properties.lat,
        lng: location.properties.lon,
        address: location.properties.formatted,
      });
    });

    return () => {
      container.innerHTML = "";
    };
  }, [setLocation, defaultAddress]);

  return (
    <div className="space-y-2">
      {!isLabelRemoved && (
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
      )}

      <div ref={containerRef} className={className || "w-full relative"} />

      <ErrorMessage name="location">
        {(error) => (
          <div className="text-red-500 text-sm">
            {typeof error === "string"
              ? error
              : (error as Record<string, string>)?.address ??
                Object.values(error as Record<string, string>)[0]}
          </div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default GooglePlacesAutocomplete;
