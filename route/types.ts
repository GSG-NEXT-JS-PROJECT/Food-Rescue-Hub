import { Role } from "@/@types";
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
    ;
    
export const protectedRoutes: PageAccessName[] = Array.from(routeAccess.keys());

export interface PageAccessRight {
    roles: Role[];
}

export interface RouteConfigs {
    pageAccessName: PageAccessName;
}