export type Role = "user" | "admin";

export interface DecodedToken {
  role: Role;
  exp: number;
  iat: number;
}
