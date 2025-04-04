import { RequestMethod, Role } from "@/@types";
import { PageAccessName, PageAccessRight } from "./types";

const routeAccess = new Map<PageAccessName, PageAccessRight>([
    [
        "/donor/profile",
        {
            roles: [Role.Donor],
            methods: [RequestMethod.Get]
        },
    ],
    [
        "/recipient/profile",
        {
            roles: [Role.Recipient],
            methods: [RequestMethod.Get]
        },
    ],
    [
        "/api/donation",
        {
            roles: [Role.Donor],
            methods: [RequestMethod.Post]
        },
    ],
    [
        "/donations/new",
        {
            roles: [Role.Donor],
            methods: [RequestMethod.Get]
        },
    ],
]);

export default routeAccess;