import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string({ required_error: "Email Required" })
    .min(1, { message: "Email Required" })
    .email({ message: "Invalid email" }),
  name: z.string({ required_error: "Name Required" }).min(1, {
    message: "Name Required",
  }),
  address: z
    .string({ required_error: "Address Required" })
    .min(1, { message: "Address Required" }),
  phone: z
    .string({ required_error: "Phone Required" })
    .min(1, { message: "Phone Required" })
    .min(10, { message: "Phone must be more than 10 characters" })
    .max(13, { message: "Phone must be less than 13 characters" })
    .refine(
      (value) => {
        return !isNaN(Number(value));
      },
      { message: "Phone must be a number" }
    ),
});
