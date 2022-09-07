import { format } from "date-fns";
import { ContractStatus } from "../../../../enums/ContractStatus";
import { Contract } from "../../../Models/Contract";
import { TwStatus } from "./Status";
import { TwTile } from "./Tile";

type Props = {
  contractualization: Contract;
};

export function ContractualizationTile({
  contractualization: contract,
}: Props) {
  function getStatus() {
    if (contract.status === ContractStatus.FINISHED) {
      return "Finalizado";
    }

    if (contract.status === ContractStatus.IN_PROGRESS) {
      return "Em andamento";
    }

    if (contract.status === ContractStatus.PENDING) {
      return "Aguardando confirmação";
    }
  }

  return (
    <TwTile $status={contract.status}>
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white capitalize">
            {contract.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            De {format(new Date(contract.effectiveDate), "dd/MM/yyyy hh:mm")} até{" "}
            {format(new Date(contract.finishDate), "dd/MM/yyyy hh:mm")}
          </p>
          <TwStatus $status={contract.status}>{getStatus()}</TwStatus>
        </div>
      </div>
    </TwTile>
  );
}
