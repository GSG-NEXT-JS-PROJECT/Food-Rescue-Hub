import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/StoreGetDeleteSession";
import { PageAccessName } from "./route/types";
import pageAccessRights from "./route/pageAccessRights";
import { apiMiddleware } from "./middlewares/apiMiddleware";
import { clientMiddleware } from "./middlewares/clientMiddleware";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSession();

  const pageAccessRight = pageAccessRights.get(pathname as PageAccessName);

  // Skip public routes like authentication endpoints
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Handle API routes
  if (pathname.startsWith("/api")) {
    return apiMiddleware(req, session, pageAccessRight);
  }

  // // Handle client-side routes
  return clientMiddleware(req, session, pageAccessRight);
}

export const config = {
  matcher: [
    "/sign-in/:path*",
    "/sign-up/:path*",
    "/recipient/:path*",
    "/donor/:path*",
    "/api/:path*",
    "/donations/:path*"
  ],
};