import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../contexts/UserContext";
import { ContractStatus } from "../../../../enums/ContractStatus";
import { Contract } from "../../../Models/Contract";
import { TwStatus } from "./Status";
import { TwTile } from "./Tile";

type Props = {
  contract: Contract;
};

export function ContractualizationTile({ contract }: Props) {
  const navigate = useNavigate();
  const { isCompany } = useUser();

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

    if (contract.status === ContractStatus.CANCELED) {
      return "Cancelado";
    }

    if (contract.status === ContractStatus.NOT_SUBSCRIBED) {
      return isCompany ? "Não aceito pelo cliente" : "Não aceito por mim";
    }
  }

  function getUpdateSolicitation() {
    if (contract.hasChangeRequest) {
      return isCompany ? "Solicitado alteração" : "Solicitado alteração pela empresa";
    }
  }

  function handleNavigationToViewContractualization() {
    navigate(`/contracts/view/${contract.id}`);
  }

  return (
    <TwTile
      $status={contract.status}
      $hasUpdateSolicitation={!!contract.hasChangeRequest}
      onClick={handleNavigationToViewContractualization}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white capitalize">
            {contract.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            De {format(new Date(contract.effectiveDate), "dd/MM/yyyy hh:mm")}{" "}
            até {format(new Date(contract.finishDate), "dd/MM/yyyy hh:mm")}
          </p>
          <TwStatus $status={contract.status}>{getStatus()}</TwStatus>
          <p className="text-sm text-red-400 font-bold">{getUpdateSolicitation()}</p>
        </div>
      </div>
    </TwTile>
  );
}
