export type User = {
  id: number;
  email: string | undefined;
  avatarUrl?: string | null;
  providerId: string;
  provider: any; // TODO: fazer model
  name: string;
  nickName: string;
  createdAt: Date;
  updatedAt: Date;
};
