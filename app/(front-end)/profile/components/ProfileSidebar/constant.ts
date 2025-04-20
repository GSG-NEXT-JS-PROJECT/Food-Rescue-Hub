import { LocationType } from "@/@types";
import { IUpdateUser } from "./type";

export const generateInitialValues = (
  name: string,
  location: LocationType
): IUpdateUser => ({
  name,
  location,
});
