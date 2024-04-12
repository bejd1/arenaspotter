import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

// Konfiguracja dla ścieżki '/admin'
export default withAuth(
  // `withAuth` dodaje token użytkownika do obiektu `Request`.
  function adminMiddleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
);

export const adminConfig = { matcher: ["/admin"] };

export const config = {
  matcher: ["/settings", "/my-arenas", "/reports", "/panel-admin"],
};
