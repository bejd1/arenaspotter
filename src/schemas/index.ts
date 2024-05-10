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

export const CreatePostSchema = z.object({
  name: z.string().min(1, "Name is required"),
  city: z.string().min(1, "City is required"),
  zipOrPostalCode: z.string().min(1, "Zip or postal code is required"),
  street: z.string().min(1, "Street is required"),
  email: z.string().min(1, "Email is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  cost: z.string().min(1, "Cost is required"),
  people: z.string().min(1, "People is required"),
  // categroy
  football: z.string().min(1, "Category is required"),
  basketball: z.string().min(1, "Category is required"),
  netball: z.string().min(1, "Category is required"),
  toilet: z.string().min(1, "Toilet is required"),
  parking: z.string().min(1, "Parking is required"),
  showers: z.string().min(1, "Showers is required"),
  dressingRoom: z.string().min(1, "Dressing room is required"),
  lighting: z.string().min(1, "Lighting is required"),
  // opening and closing hours
  monday: z.string().min(1, "Opening hours is required"),
  thesday: z.string().min(1, "Opening hours is required"),
  wednesday: z.string().min(1, "Opening hours is required"),
  thursday: z.string().min(1, "Opening hours is required"),
  friday: z.string().min(1, "Opening hours is required"),
  saturday: z.string().min(1, "Opening hours is required"),
  sunday: z.string().min(1, "Opening hours is required"),
  description: z.string().min(0, "Email is required"),
  instagram: z.string().min(0, "Email is required"),
  facebook: z.string().min(0, "Email is required"),
  website: z.string().min(0, "Email is required"),
  image: z.string().min(0, "Image is required"),
});
