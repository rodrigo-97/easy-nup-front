import { Client } from "./Client";
import { Contract } from "./Contract";
import { User } from "./User";

export type Company = {
  id: number;
  socialCode: string;
  socialName: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  contracts: Array<Contract>;
  clients: Array<Client>;
};
