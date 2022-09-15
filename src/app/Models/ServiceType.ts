import { Param } from "./Params";

export type ServiceType = {
  id: number;
  name: string;
  companyContractId: number;
  createdAt: Date;
  updatedAt: Date;
  params: Array<Param>;
};
