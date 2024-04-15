export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/settings",
    "/my-arenas",
    "/reports",
    "/panel-admin",
    "/my-account",
    "/(.)my-account",
  ],
};
