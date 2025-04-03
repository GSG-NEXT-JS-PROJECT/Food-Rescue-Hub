import { NextResponse, NextRequest } from "next/server";
import { RequestMethod, Role, TokenPayload } from "../@types";
import { PageAccessRight } from "../route/types";

// Handle API route authorization
export function apiMiddleware(req: NextRequest, session: TokenPayload | null | undefined, pageAccessRight: PageAccessRight) {
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

  // Add user details to headers
  const modifiedReq = req.clone();
  modifiedReq.headers.set("x-user-id", session.userId);
  modifiedReq.headers.set("x-user-role", session.userRole);
  return null; // Null means "proceed"
}