"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function register(data: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const { name, email, password } = data;
    const bcrypt = require("bcrypt");
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      console.log("User with this email already exists");
      return { error: "Email already in use" };
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
    return { error: "An error occurred during registration" };
  }
}
