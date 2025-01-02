import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
      email: string;
      id: string;
      name: string;
      role: string;
    } & DefaultSession;
  }
}
declare module "next-auth" {
  interface JWT extends DefaultJWT {
    access_token: string;
    email: string;
    name: string;
    id: string;
    role: string;
  }
}
