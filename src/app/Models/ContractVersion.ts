export type ContractVersion = {
  id: number;
  serializedContract: string;
  requestedContractSerialized: string;
  acceptedAt: Date;
  rejectedAt: Date;
};
