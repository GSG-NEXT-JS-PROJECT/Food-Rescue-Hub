import { NextResponse, NextRequest } from "next/server";
import { RequestMethod, Role, TokenPayload } from "../@types";
import { RouteAccessRight } from "../route/types";

export function apiMiddleware(
  req: NextRequest,
  session: TokenPayload | null | undefined,
  pageAccessRight: RouteAccessRight | undefined
) {
  const { pathname } = req.nextUrl;
  const scope = req.nextUrl.searchParams.get("scope");
  const method = req.method as RequestMethod;
  if (
    pathname.startsWith("/api/auth") ||
    (pathname === "/api/donations" && scope === "total")
  ) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated or invalid token" },
      { status: 401 }
    );
  }

  if (
    pageAccessRight &&
    !pageAccessRight[method]?.includes(session.userRole as Role)
  ) {
    return NextResponse.json(
      {
        error: `Unauthorized: ${JSON.stringify(pageAccessRight[method])} only`,
      },
      { status: 403 }
    );
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", session.userId);
  requestHeaders.set("x-user-role", session.userRole);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
