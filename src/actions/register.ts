"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function register(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      console.log("User with this email already exists");
    }

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return { success: "Registration successful" };
  } catch (error) {
    console.error("Error during user creation:", error);
    return { error: "Email already in use" };
  }
}
