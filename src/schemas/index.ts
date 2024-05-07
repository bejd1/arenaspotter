import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "The password is required"),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "The name is required"),
  email: z.string().email(),
  password: z.string().min(4, "Minimum 4 characters required"),
});

export const ReportSchema = z.object({
  title: z.string().min(1, "The title is required"),
  message: z.string().min(1, "The message is required"),
});
