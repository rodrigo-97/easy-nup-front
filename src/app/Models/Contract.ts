import { ContractStatus } from "../../enums/ContractStatus";
import { ServiceType } from "./ServiceType";
import { Price } from "./Price";
import { Client } from "./Client";
import { Company } from "./Company";
import { ContractVersion } from "./ContractVersion";

export type Contract = {
  id: number;
  name: string;
  effectiveDate: Date;
  finishDate: Date;
  functionPointValue: number;
  predictedVolumeFunctionPoint: number;
  createdAt: Date;
  updatedAt: Date;
  status: ContractStatus;
  client: Client;
  company: Company;
  serviceTypes: Array<ServiceType>;
  prices: Array<Price>;
  hasChangeRequest: boolean;
  hasDeleteRequest: boolean;
  versions: Array<ContractVersion>;
};
