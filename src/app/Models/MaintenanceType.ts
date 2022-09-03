import { Contractualization } from "./Contractualization";
import { Param } from "./Params";

export type MaintenanceType = {
  id: number;
  name: string;
  companyContractId: number;
  createdAt: Date;
  updatedAt: Date;
  companyContract: Contractualization;
  params: Array<Param>;
};
