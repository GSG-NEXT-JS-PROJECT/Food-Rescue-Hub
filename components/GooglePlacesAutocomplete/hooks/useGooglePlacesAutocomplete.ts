import { LocationType } from "@/@types";
import { useFormikContext } from "formik";
import { useCallback } from "react";

const useGooglePlacesAutocomplete = () => {
  const { setFieldValue } = useFormikContext();

  const setLocation = useCallback(
    (location: LocationType) => {
      setFieldValue("location", location);
    },
    [setFieldValue]
  );

  return { setLocation };
};

export default useGooglePlacesAutocomplete;
