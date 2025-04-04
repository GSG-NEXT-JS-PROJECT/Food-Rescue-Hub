import { NextResponse, NextRequest } from "next/server";
import { RequestMethod, Role, TokenPayload } from "../@types";
import { PageAccessRight } from "../route/types";

export function clientMiddleware(
  req: NextRequest,
  session: TokenPayload | null | undefined,
  pageAccessRight: PageAccessRight | null | undefined
) {
  const { pathname } = req.nextUrl;

  // Redirect signed-in users away from sign-in/sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (session) {
      return NextResponse.redirect(new URL("/already-signed-in", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
  }

  if (
    pageAccessRight &&
    (!pageAccessRight.roles.includes(session.userRole as Role) ||
      !pageAccessRight.methods.includes(req.method as RequestMethod))
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
  }

  return NextResponse.next();
}
