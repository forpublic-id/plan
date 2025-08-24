import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["id", "en"],

  // Used when no locale matches
  defaultLocale: "id",

  // Enable automatic locale detection
  localeDetection: true,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
