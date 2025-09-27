import type { User } from "./User";
import type { Role } from "./Role";

export interface UserRole {
  _id: string;
  user: User;
  role: Role;
}
