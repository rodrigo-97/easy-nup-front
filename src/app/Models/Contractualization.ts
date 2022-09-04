import { Client } from "./Client";
import { Company } from "./Company";
import { Contract } from "./Contract";
import { ServiceType } from "./ServiceType";

export type Contractualization = {
  id: number;
  contractId: number;
  companyId: number;
  clientId: number;
  createdAt: Date;
  updatedAt: Date;
  client: Client;
  company: Company;
  contract: Contract;
  serviceType: Array<ServiceType>;
};
