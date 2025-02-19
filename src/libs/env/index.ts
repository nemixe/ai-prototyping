import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_BASE_URL: z.string().url(),
  VITE_AUTH_FUSION_ID: z.string().optional(),
  VITE_AUTH_FUSION_TENANT_ID: z.string().optional(),
  VITE_AUTH_FUSION_ISSUER_URL: z.string().optional(),
});

export const env = envSchema.parse(import.meta.env);
