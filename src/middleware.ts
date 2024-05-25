import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  matcher: [
    // "/settings",
    // "/my-arenas",
    // "/reports",
    "/panel-admin",
    "/my-account",
    "/(.)my-account",
    "/create-post",
  ],
};

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
