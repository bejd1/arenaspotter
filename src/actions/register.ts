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
      throw new Error("User with this email already exists");
    }

    if (existingUser) {
      return { error: "Email already in use" };
    }

    console.log({ name, email, password });

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    console.log(`created new user : ${name}, ${email}, ${password}`);
  } catch (error) {
    console.error("Error during user creation:", error);
  }
  return { success: "Registration successful" };
}
