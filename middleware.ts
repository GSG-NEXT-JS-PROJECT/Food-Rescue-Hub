import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./@types";
import { getSession } from "./lib/StoreGetDeleteSession";
import { PageAccessName, protectedRoutes } from "./route/types";
import pageAccessRights from "./route/pageAccessRights";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const session = await getSession();
    const pageAccessRight = pageAccessRights.get(pathname as PageAccessName) || { roles: [] };

    if (pathname === "/sign-in" || pathname === "/sign-up") {
        const hasToken = Boolean(session);
        if (hasToken) {
            return NextResponse.redirect(new URL("/already-signed-in", req.nextUrl));
        }
    }

    if (protectedRoutes.includes(pathname as PageAccessName)) {
        if (!session) {
            return NextResponse.redirect(new URL("/forbidden", req.nextUrl));
        } else if (!pageAccessRight.roles.includes(session.userRole as Role)) {
            return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/sign-in/:path*", "/sign-up/:path*", "/recipient/:path*", "/donor/:path*"],
};