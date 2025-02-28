import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.number().min(1, "Year is required"),
  publish_date: z.string().min(1, "Publish date is required"),
});

export type TBookSchema = z.infer<typeof bookSchema>;
