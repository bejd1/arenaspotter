import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 6 characters.",
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 6 characters.",
  }),
});

export const ReportSchema = z.object({
  title: z.string().min(1, "The title is required"),
  message: z.string().min(1, "The message is required"),
});

export const SettingsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().min(1, "Email is required"),
});
