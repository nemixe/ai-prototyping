import { z } from "zod";

export const UserFormSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  birthdate: z.string().min(1, "Birth date is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserFormData = z.infer<typeof UserFormSchema>;
