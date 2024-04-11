import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      role: string;
      image: string;
      name: string;
      email: string;
      id: string;
    };
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string;
  }
}
