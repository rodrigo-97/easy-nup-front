import { ContractStatus } from "../enums/ContractStatus";

export function parseContractStatus(contractStatus: ContractStatus) {
  if (contractStatus === ContractStatus.CANCELED) {
    return "Cancelado";
  }

  if (contractStatus === ContractStatus.FINISHED) {
    return "Finalizado";
  }

  if (contractStatus === ContractStatus.IN_PROGRESS) {
    return "Em andamento";
  }

  if (contractStatus === ContractStatus.NOT_SUBSCRIBED) {
    return "Não aceito";
  }

  if (contractStatus === ContractStatus.PENDING) {
    return "Pendente";
  }
}
