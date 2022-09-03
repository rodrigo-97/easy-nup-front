import { MaintenanceType } from "./MaintenanceType";

export type Param = {
  id: number;
  name: string;
  fi: number;
  companyContractId: number;
  companyId: number;
  maintenanceTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  maintenanceTypes: MaintenanceType;
};
