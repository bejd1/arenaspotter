"use server";

import { PrismaClient } from "@prisma/client";
import { signIn } from "next-auth/react";

const prisma = new PrismaClient();

export const login = async (formData: FormData) => {
  try {
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;

    console.log(password, email);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return { error: "User not found" };
    }

    const bcrypt = require("bcrypt");
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return { error: "Invalid email or password" };
    }
    await signIn("credentials", {
      email: email,
      password: password,
    });
  } catch (error) {
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    console.error("Error during login:", error);
    return { error: "Something went wrong!" };
  }
  return { success: "Fine" };
};
