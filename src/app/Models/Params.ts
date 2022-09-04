import { ServiceType } from "./ServiceType";

export type Param = {
  id: number;
  name: string;
  fi: number;
  companyContractId: number;
  companyId: number;
  serviceTypeId: number;
  createdAt: Date;
  updatedAt: Date;
  serviceType: ServiceType;
};
