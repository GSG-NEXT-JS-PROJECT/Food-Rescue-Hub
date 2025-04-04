import { NextResponse, NextRequest } from "next/server";
import { RequestMethod, Role, TokenPayload } from "../@types";
import { PageAccessRight } from "../route/types";

export function apiMiddleware(
  req: NextRequest,
  session: TokenPayload | null | undefined,
  pageAccessRight: PageAccessRight | undefined
) {
  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated or invalid token" },
      { status: 401 }
    );
  }

  if (
    pageAccessRight &&
    (!pageAccessRight.roles.includes(session.userRole as Role) ||
      !pageAccessRight.methods.includes(req.method as RequestMethod))
  ) {
    return NextResponse.json(
      { error: `Unauthorized: ${JSON.stringify(pageAccessRight.roles)} only` },
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
