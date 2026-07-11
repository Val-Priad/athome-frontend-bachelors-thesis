import { z } from "zod";

export const userRoleSchema = z.enum(["user", "agent", "admin"]);

export const currentUserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  role: userRoleSchema,

  name: z.string().nullable(),
  phone_number: z.string().nullable(),
  avatar_key: z.string().nullable(),
  description: z.string().nullable(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type CurrentUser = z.infer<typeof currentUserSchema>;
