import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["id", "en"],
  defaultLocale: "id",
  localePrefix: "always",
  localeDetection: false, // Force default locale instead of browser detection
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // If user is accessing root and gets redirected, ensure we set the right cookie
  if (request.nextUrl.pathname === "/" && response.status === 307) {
    response.cookies.set("NEXT_LOCALE", "id", { path: "/", sameSite: "lax" });
  }

  return response;
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(id|en)/:path*",
    // Enable redirects that add missing locales
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
