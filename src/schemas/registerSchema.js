import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email" }),
  phone: z.string()
    .length(10, { message: "Phone number should be exactly 10 digits" })
    .regex(/^\d{10}$/, { message: "Only numbers are allowed" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"], // Path to the field where the error message should appear
});
