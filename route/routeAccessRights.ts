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
  "/api/donations": {
    GET: [Role.Recipient, Role.Donor],
    POST: [Role.Donor],
  },
  "/api/claim-donation": {
    POST: [Role.Recipient],
  },
};

export default routeAccess;
