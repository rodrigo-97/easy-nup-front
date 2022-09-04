import { ContractStatus } from "../../enums/ContractStatus";
import { ServiceType } from "./ServiceType";
import { Price } from "./Price";

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
  serviceTypes: Array<ServiceType>;
  prices: Array<Price>;
};
