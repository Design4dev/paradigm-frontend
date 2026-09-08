import { env } from "@/config/environment";
import { ADMIN_ACCESS_COOKIE } from "@/lib/constants";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Prototype-grade gate for `/admin`. There is no real authentication system
 * in this project — this is a shared-secret cookie check, not identity or
 * role-based access control. Visit `/admin?key=<ADMIN_ACCESS_KEY>` once to
 * unlock it for this browser; see `.env.example`. Replace with real auth
 * before this ever leaves prototype status.
 */
export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (!env.adminAccessKey) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const providedKey = request.nextUrl.searchParams.get("key");
  const cookieKey = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value;

  if (providedKey && providedKey === env.adminAccessKey) {
    const url = new URL(request.nextUrl.pathname, request.url);
    const response = NextResponse.redirect(url);
    response.cookies.set(ADMIN_ACCESS_COOKIE, providedKey, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  if (cookieKey === env.adminAccessKey) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
