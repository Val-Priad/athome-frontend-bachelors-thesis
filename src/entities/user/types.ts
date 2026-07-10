export type UserRole = "user" | "agent" | "admin";

export type CurrentUser = {
  id: string;
  email: string;
  role: UserRole;

  name: string | null;
  phone_number: string | null;
  avatar_key: string | null;
  description: string | null;
};
