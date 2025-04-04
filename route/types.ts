import { RequestMethod, Role } from "@/@types";
import routeAccess from "./pageAccessRights";

export type PageAccessName =
  | "/"
  | "/sign-in"
  | "/sign-up"
  | "/donor/profile"
  | "/recipient/profile"
  | "/already-signed-in"
  | "/forbidden"
  | "/unauthorized"
  | "/already-signed-in"
  | "/api/donation"
  | "/donations/new"

export const protectedRoutes: PageAccessName[] = Array.from(routeAccess.keys());

export interface PageAccessRight {
  roles: Role[];
  methods: RequestMethod[];
}

export interface RouteConfigs {
  pageAccessName: PageAccessName;
}
