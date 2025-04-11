import { Role } from "@/@types";
import { RouteAccess } from "./types";

const routeAccess: RouteAccess = {
  "/post-donation": {
    GET: [Role.Donor],
  },
  "/api/donations": {
    GET: [Role.Donor, Role.Recipient],
    POST: [Role.Donor],
  },
  "/api/claim-donation": {
    POST: [Role.Recipient],
  },
  "/donations": {
    GET: [Role.Recipient],
  },
};

export default routeAccess;
