import { Client } from "./Client";
import { Company } from "./Company";

export type User = {
  id: number;
  email: string | undefined;
  avatarUrl?: string | null;
  providerId: string;
  provider: any; // TODO: fazer model
  name: string;
  nickName: string;
  client: Client;
  emailVerified: boolean;
  company: Company;
  createdAt: Date;
  updatedAt: Date;
};
