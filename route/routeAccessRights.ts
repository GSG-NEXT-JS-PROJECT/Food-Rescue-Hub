import { Role } from "@/@types";
import { RouteAccess } from "./types";

const routeAccess: RouteAccess = {
  "/post-donation": {
    GET: [Role.Donor],
  },
  "/donations": {
    GET: [Role.Recipient, Role.Admin],
  },
  "/analytics": {
    GET: [Role.Admin],
  },
  "/profile": {
    GET: [Role.Donor, Role.Recipient],
  },
  "/api/donations": {
    GET: [Role.Recipient, Role.Donor],
    POST: [Role.Donor],
    PATCH: [Role.Donor, Role.Admin, Role.Recipient],
    DELETE: [Role.Donor, Role.Admin]
  },
  "/api/claim-donation": {
    POST: [Role.Recipient],
  },
  "/api/analytics": {
    GET: [Role.Admin],
    POST: [Role.Admin]
  }
};

export default routeAccess;
