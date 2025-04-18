import { LocationType } from "@/@types";
import { useFormikContext } from "formik";
import { useState } from "react";

const useGooglePlacesAutocomplete = () => {
  const formik = useFormikContext();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onPlaceChanged = (
    setFieldValue: (field: string, value: LocationType) => void
  ) => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location: LocationType = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.name || "",
        };
        setFieldValue("location", location);
      }
    }
  };

  const handleLoad = (auto: google.maps.places.Autocomplete) => {
    setAutocomplete(auto);
  };

  const handlePlaceChanged = () => {
    onPlaceChanged(formik.setFieldValue);
  };

  return { handleLoad, handlePlaceChanged };
};

export default useGooglePlacesAutocomplete;
