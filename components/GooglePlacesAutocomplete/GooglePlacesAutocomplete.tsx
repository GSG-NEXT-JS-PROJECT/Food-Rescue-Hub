"use client";

import React, { FC } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { LoadScript } from "@react-google-maps/api";
import useGooglePlacesAutocomplete from "./hooks/useGooglePlacesAutocomplete";

interface GooglePlacesAutocompleteProps {
  defaultAddress?: string;
}

const googleMapsLibraries: "places"[] = ["places"];
const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";

const GooglePlacesAutocomplete: FC<GooglePlacesAutocompleteProps> = ({
  defaultAddress,
}) => {
  const { handleLoad, handlePlaceChanged } = useGooglePlacesAutocomplete();

  return (
    <div className="space-y-2">
      <LoadScript
        googleMapsApiKey={GOOGLE_API_KEY}
        libraries={googleMapsLibraries}
        loadingElement={<Spinner type="circle" size="xl" />}
      >
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
          <Input
            type="text"
            placeholder="Enter or select a location"
            className="mt-1 py-2 px-3 block w-full bg-gray-100 border-none outline-none"
            defaultValue={defaultAddress}
          />
        </Autocomplete>
        <ErrorMessage
          name="location"
          component="div"
          className="text-red-500 text-sm"
        />
      </LoadScript>
    </div>
  );
};

export default GooglePlacesAutocomplete;
