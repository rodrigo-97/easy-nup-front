import { FiChevronRight } from "react-icons/fi";
import { ContractStatus } from "../../enums/ContractStatus";
import { Contract } from "../Models/Contract";

type Props = {
  contract: Contract;
  onClick: () => void;
};

export function ContractTile({ contract, onClick }: Props) {
  const {
    status,
    name,
    effectiveDate: _effectiveDate,
    finishDate: _finishDate,
  } = contract;

  const effectiveDate = new Date(_effectiveDate).toLocaleDateString("pt-BR");
  const finishDate = new Date(_finishDate).toLocaleDateString("pt-BR");

  function getStatusFromContrat() {
    if (status === ContractStatus.PENDING)
      return (
        <small className="text-secondary">
          Confirmação pendente pelo cliente
        </small>
      );

    if (status === ContractStatus.FINISHED)
      return <small className="text-green-500">Finalizado</small>;

    if (status === ContractStatus.IN_PROGRESS)
      return <small className="text-primary-500">Em andamento</small>;
  }

  return (
    <div className="contract-tile p-4 rounded mb-3" onClick={onClick}>
      <div className="d-flex flex-column gap-1">
        <div className="d-flex gap-3">{name}</div>
        <span style={{ fontSize: ".8rem" }}>
          {" "}
          Vigente desde <b>{effectiveDate}</b> até <b>{finishDate}</b>
        </span>
        <span className="mt-2">{getStatusFromContrat()}</span>
      </div>
      <div>
        <FiChevronRight size={20} />
      </div>
    </div>
  );
}
