import { NextResponse, NextRequest } from "next/server";
import { RequestMethod, Role, TokenPayload } from "../@types";
import { RouteAccessRight } from "../route/types";
import { forbidden, unauthorized } from "next/navigation";

export function clientMiddleware(
  req: NextRequest,
  session: TokenPayload | null | undefined,
  pageAccessRight: RouteAccessRight | null | undefined
) {
  const { pathname } = req.nextUrl;
  const method = req.method as RequestMethod;

  // Redirect signed-in users away from sign-in/sign-up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (session) {
      return NextResponse.redirect(new URL("/already-signed-in", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
  }

  if (
    pageAccessRight &&
    !pageAccessRight[method]?.includes(session.userRole as Role)
  ) {
    return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
  }

  return NextResponse.next();
}
