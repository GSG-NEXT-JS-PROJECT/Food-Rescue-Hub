import { RequestMethod, Role } from "@/@types";

export type RouteAccessName =
  | "/"
  | "/sign-in"
  | "/sign-up"
  | "/donor/profile"
  | "/recipient/profile"
  | "/already-signed-in"
  | "/forbidden"
  | "/unauthorized"
  | "/already-signed-in"
  | "/api/donations"
  | "/post-donation"
  | "/donations"
  | "/api/claim-donation";

export type RouteAccessRight = {
  [method in RequestMethod]?: Role[];
};

export type RouteAccess = {
  [path in RouteAccessName]?: RouteAccessRight;
};
