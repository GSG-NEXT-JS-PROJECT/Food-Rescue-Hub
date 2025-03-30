import { Role } from "@/@types";
import { PageAccessName, PageAccessRight } from "./types";

const routeAccess = new Map<PageAccessName, PageAccessRight>([
    [
        "/donor/profile",
        {
            roles: [Role.Donor],
        },
    ],
    [
        "/recipient/profile",
        {
            roles: [Role.Recipient],
        },
    ],
]);

export default routeAccess;