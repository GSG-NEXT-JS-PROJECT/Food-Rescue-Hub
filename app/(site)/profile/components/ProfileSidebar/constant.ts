import { LocationType } from "@/@types";
import { IUpdateUser } from "./type";

export const generateInitialValues = (
  name: string,
  location: LocationType,
  imageUrl: string
): IUpdateUser => ({
  name,
  location,
  imageUrl: imageUrl
});
