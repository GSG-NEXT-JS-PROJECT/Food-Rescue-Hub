
import { NextResponse, NextRequest } from "next/server";
import { RequestMethod, Role, TokenPayload } from "../@types";
import { PageAccessName, PageAccessRight, protectedRoutes } from "../route/types";

// Handle client-side route authorization
export function clientMiddleware(req: NextRequest, session: TokenPayload, pageAccessRight: PageAccessRight) {
  const { pathname } = req.nextUrl;

  if (!session) {
    return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
  }

  // Redirect signed-in users away from sign-in/sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (session) {
      return NextResponse.redirect(new URL("/already-signed-in", req.nextUrl));
    }
  }

  // Protect specific routes
  if (protectedRoutes.includes(pathname as PageAccessName)) {
    if (!session) {
      return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
    } else if (
      !pageAccessRight.roles.includes(session.userRole as Role) ||
      !pageAccessRight.methods.includes(req.method as RequestMethod)
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  }

  return null; // Null means "proceed"
}