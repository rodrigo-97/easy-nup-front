import { Button } from "@vechaiui/react";
import { ContractStatus } from "../../../../enums/ContractStatus";
import { Contract } from "../../../Models/Contract";

type Props = {
  contract: Contract;
};

export function CompanyContractOptions({ contract }: Props) {
  function getUpdateText() {
    if (contract.status === ContractStatus.PENDING) return "Alterar";
    if (contract.status === ContractStatus.IN_PROGRESS)
      return "Solicitar alteração";
  }

  function getDeleteText() {
    if (contract.status === ContractStatus.PENDING) return "Deletar";
    if (contract.status === ContractStatus.IN_PROGRESS)
      return "Solicitar deleção";
  }

  return (
    <div className="flex justify-end space-x-3">
      {(contract.status === ContractStatus.IN_PROGRESS ||
        contract.status === ContractStatus.PENDING) && (
        <>
          <Button variant="solid" color="red">
            {getDeleteText()}
          </Button>
          <Button variant="solid" color="blue">
            {getUpdateText()}
          </Button>
        </>
      )}
    </div>
  );
}
