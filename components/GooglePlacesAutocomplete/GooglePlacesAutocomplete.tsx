"use client";

import React, { FC } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useGooglePlacesAutocomplete from "./hooks/useGooglePlacesAutocomplete";

interface GooglePlacesAutocompleteProps {
  defaultAddress?: string;
  className?: string;
  isLabelRemoved?: boolean;
}

const googleMapsLibraries: "places"[] = ["places"];
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

const GooglePlacesAutocomplete: FC<GooglePlacesAutocompleteProps> = ({
  defaultAddress,
  className = "",
  isLabelRemoved = false,
}) => {
  const { handleLoad, handlePlaceChanged } = useGooglePlacesAutocomplete();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries: googleMapsLibraries,
  });

  if (!isLoaded) {
    return <Spinner type="circle" size="xl" />;
  }

  return (
    <div className="space-y-2">
      {!isLabelRemoved && (
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
      )}

      {isLoaded && (
        <>
          <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
            <Input
              type="text"
              placeholder="Enter or select a location"
              className={`${
                Boolean(className)
                  ? className
                  : "mt-1 py-2 px-3 block w-full bg-gray-100 border-none outline-none"
              }`}
              defaultValue={defaultAddress}
            />
          </Autocomplete>
          <ErrorMessage
            name="location"
            component="div"
            className="text-red-500 text-sm"
          />
        </>
      )}
    </div>
  );
};

export default GooglePlacesAutocomplete;
