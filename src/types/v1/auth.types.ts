import { User } from "src/schema/v1/user.schema";

export interface Payload {
  _id: string;
  email: string;
  displayName: string;
  role?: Role
}

export interface Session {
  cid: string;
  email: string;
  userName: string;
  user?: User;
  role?: Role
}

export enum Role {
  USER = 'user',
  STAFF = 'staff',
  ADMIN = 'admin',
}

export interface AuthenticateRequest extends Request {
  path: any;
  user: { id: string, email: string };
}