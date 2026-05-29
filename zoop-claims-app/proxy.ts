import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Demo access gate. Until a valid `zoop_unlocked=1` cookie is present, every
 * request is redirected to /access. The cookie is set by /access on a correct
 * username + password.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the gate page itself + Next internals + favicon
  if (
    pathname === "/access" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Allow through if unlocked
  if (request.cookies.get("zoop_unlocked")?.value === "1") {
    return NextResponse.next();
  }

  // Otherwise → gate
  const url = request.nextUrl.clone();
  url.pathname = "/access";
  // Preserve where the user was headed so we can bounce them back after unlock
  if (pathname !== "/") {
    url.searchParams.set("next", pathname);
  }
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except static assets and the Next.js image optimizer
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
