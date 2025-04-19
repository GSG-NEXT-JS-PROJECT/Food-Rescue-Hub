import { NextResponse, NextRequest } from "next/server";
import { RequestMethod, Role, TokenPayload } from "../@types";
import { RouteAccessRight } from "../route/types";
import { verifyToken } from "@/lib/generateAndVerify";

export async function apiMiddleware(
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
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
      session = await verifyToken(token);
    }
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
