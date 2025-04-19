import type { NextRequest } from "next/server";
import { getSession } from "./lib/StoreGetDeleteSession";
import { RouteAccessName } from "./route/types";
import routeAccess from "./route/routeAccessRights";
import { apiMiddleware } from "./middlewares/apiMiddleware";
import { clientMiddleware } from "./middlewares/clientMiddleware";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSession();
  const pageAccessRight = routeAccess[pathname as RouteAccessName];

  // Handle API routes
  if (pathname.startsWith("/api")) {
    return apiMiddleware(req, session, pageAccessRight);
  }

  // Handle client-side routes
  return clientMiddleware(req, session, pageAccessRight);
}

export const config = {
  matcher: [
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/recipient/:path*",
    "/donor/:path*",
    "/api/:path*",
    "/donations/:path*",
    "/post-donation"
  ],
};
