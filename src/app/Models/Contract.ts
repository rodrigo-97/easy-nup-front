import { MaintenanceType } from "./MaintenanceType";
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
  maintenanceTypes: Array<MaintenanceType>;
  prices: Array<Price>;
};
