import NextAuth from "next-auth";

export default NextAuth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};