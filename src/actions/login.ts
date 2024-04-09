"use server";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "next-auth/react";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
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

    throw error;
  }
  return { success: "Fine" };
};
