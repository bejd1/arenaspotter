// import type { NextAuthOptions, Session } from "next-auth";
// import GithubProvider, { GithubProfile } from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { LoginSchema } from "@/schemas";
// import { getUserByEmail } from "@/actions/user";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import Adapters from "next-auth/adapters";

// import { PrismaClient } from "@prisma/client";
// // import prisma from "@/app/utlis/db";

// const prisma = new PrismaClient();

// export const options: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       // profile(profile: GithubProfile) {
//       //   return {
//       //     ...profile,
//       //     role: profile.role ?? "user",
//       //     id: profile.id.toString(),
//       //     image: profile.avatar_url,
//       //   };
//       // },
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       // profile(profile) {
//       //   return {
//       //     id: profile.sub,
//       //     name: `${profile.given_name} ${profile.family_name}`,
//       //     email: profile.email,
//       //     image: profile.picture,
//       //     role: profile.role ? profile.role : "user",
//       //   };
//       // },
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "login" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "password",
//         },
//       },
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);

//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;

//           const user = await getUserByEmail(email);
//           if (!user || !user.password) return null;

//           const bcrypt = require("bcrypt");
//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (passwordsMatch) {
//             return {
//               id: user.id,
//               name: user.name,
//               email: user.email,
//               image: user.image,
//               password: null,
//               role: user.role,
//             };
//           }
//         }
//         return null;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
// };
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};
