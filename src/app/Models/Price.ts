import { Contract } from "./Contract";

export type Price = {
  id: number;
  pf: number;
  ust: number;
  hh: number;
  pfReajustPercentage: number;
  ustReajustPercentage: number;
  hhReajustPercentage: number;
  isFromReajust: boolean;
  isFromRenegotiation: boolean;
  contractId: number;
  createdAt: Date;
  updatedAt: Date;
  contract: Contract;
};
