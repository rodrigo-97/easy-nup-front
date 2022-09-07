import { ContractStatus } from "../../enums/ContractStatus";
import { ServiceType } from "./ServiceType";
import { Price } from "./Price";
import { Client } from "./Client";
import { Company } from "./Company";

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
  clients: Client;
  company: Company;
  serviceTypes: Array<ServiceType>;
  prices: Array<Price>;
};
