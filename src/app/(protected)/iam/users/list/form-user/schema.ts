import { z } from "zod";

export const UserFormSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
  email: z.string().email(),

  roleId: z.number(),
});

export type UserFormData = z.infer<typeof UserFormSchema>;
