import { Role } from "@/@types";
import { RouteAccess } from "./types";

const routeAccess: RouteAccess = {
  "/donations/new": {
    GET: [Role.Donor],
  },
  "/api/donations": {
    GET: [Role.Donor, Role.Recipient],
    POST: [Role.Donor],
  },
};

export default routeAccess;
