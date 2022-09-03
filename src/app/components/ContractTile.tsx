import { FiChevronRight } from "react-icons/fi";
import { Contractualization } from "../Models/Contractualization";

type Props = {
  contractualization: Contractualization;
  onClick: () => void;
};

export function ContractTile({ contractualization, onClick }: Props) {
  const effectiveDate = new Date(
    contractualization.contract.effectiveDate
  ).toLocaleDateString("pt-BR");
  const finishDate = new Date(
    contractualization.contract.finishDate
  ).toLocaleDateString("pt-BR");
  return (
    <div className="contract-tile p-4 rounded mb-3" onClick={onClick}>
      <div className="d-flex flex-column">
        <span>{contractualization.contract.name}</span>
        <span style={{ fontSize: ".8rem" }} className="text-gray-200">
          {" "}
          Vigente desde <b>{effectiveDate}</b> até <b>{finishDate}</b>
        </span>
      </div>
      <div>
        <FiChevronRight size={20} />
      </div>
    </div>
  );
}
