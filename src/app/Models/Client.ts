import { Contract } from "./Contract";
import { User } from "./User";

export type Client = {
  id: number;
  userId: number;
  companyId?: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};
