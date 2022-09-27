import { Button } from "@vechaiui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContractStatus } from "../../../../enums/ContractStatus";
import { parseApiError } from "../../../../helpers/ParseApiError";
import {
  showConfirmAction,
  showErrorToast,
  showSuccessToast,
} from "../../../../helpers/Toast";
import { Contract } from "../../../Models/Contract";
import { deleteContrac } from "../../../services/Contractualizations";

type Props = {
  contract: Contract;
};

export function CompanyContractOptions({ contract }: Props) {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const navigate = useNavigate();

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

  function handleDelete() {
    setLoadingDelete(true);

    showConfirmAction({
      btnConfirmText: "Sim, desejo excluir o contrato",
      title: "Confirmar ação",
      text: "Você realmente deseja excluir este contrato? Esta acção será irreversível",
      onConfirm: () =>
        deleteContrac(contract.id)
          .then(() => {
            const msg =
              contract.status === ContractStatus.PENDING
                ? "Contrato deletado"
                : "Solicitação de exclusão enviada ao cliente";
            showSuccessToast({ message: msg });
            navigate(-1);
          })
          .catch((error) => {
            showErrorToast({ message: parseApiError(error) });
          })
          .finally(() => {
            setLoadingDelete(false);
          }),
    });
  }

  function handleUpdate() {
    navigate(`/contracts/update/${contract.id}`);
  }

  return (
    <div className="flex justify-end space-x-3">
      {(contract.status === ContractStatus.IN_PROGRESS ||
        contract.status === ContractStatus.PENDING) && (
        <>
          <Button variant="solid" color="red" onClick={handleDelete}>
            {getDeleteText()}
          </Button>
          <Button variant="solid" color="blue" onClick={handleUpdate}>
            {getUpdateText()}
          </Button>
        </>
      )}
    </div>
  );
}
