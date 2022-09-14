import { Button } from "@vechaiui/react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ContractStatus } from "../../../../enums/ContractStatus";
import {
  showConfirmAction,
  showErrorToast,
  showSuccessToast,
} from "../../../../helpers/Toast";
import { Contract } from "../../../Models/Contract";
import {
  acceptDelete,
  rejectDelete,
  subscribeContract,
} from "../../../services/Client";

type Props = {
  contract: Contract;
};

export function ClientContractOptions({ contract }: Props) {
  const navigate = useNavigate();

  function handleSubscribeContract(type: "SUBSCRIBE" | "NOT_SUBSCRIBE") {
    subscribeContract({
      type,
      clientId: contract.client.id,
      companyId: contract.company.id,
      contractId: contract.id,
    })
      .then(() => {
        showSuccessToast({
          message: `Contratualização ${type === "NOT_SUBSCRIBE" ? "recusada" : "aceita"
            } com sucesso`,
        });
        navigate(-1);
      })
      .catch((error) =>
        showErrorToast({ message: error?.response?.data.error })
      );
  }

  function handleRedirectToDiffContracts() {
    navigate(`/contracts/diff/${contract.id}`);
  }

  function handleRejectDelete() {
    showConfirmAction({
      btnConfirmText: "Sim, desejo rejeitar o pedido",
      onConfirm: () =>
        rejectDelete(contract.id)
          .then(() => {
            showSuccessToast({ message: "Pedido de deleção rejeitado" });
            navigate(-1);
          })
          .catch((error) => {
            showErrorToast({
              message: error?.response?.data.error,
            });
          }),
      title: "Confirmar ação",
      text: "Você realmente deseja recusar a solicitação de exclusão do contrato?",
    });
  }

  function handleAcceptDelete() {
    showConfirmAction({
      btnConfirmText: "Sim, desejo excluir o contrato",
      onConfirm: () =>
        acceptDelete(contract.id)
          .then(() => {
            showSuccessToast({ message: "Contrato deletado" });
            navigate(-1);
          })
          .catch((error) => {
            showErrorToast({
              message: error?.response?.data.error,
            });
          }),
      title: "Confirmar ação",
      text: "Você realmente deseja excluir este contrato? <br> Esta ação será <b>irreversível</b>",
    });
  }

  return (
    <div className="flex justify-end space-x-3">
      {contract.hasChangeRequest && !contract.hasDeleteRequest && (
        <Button
          variant="outline"
          color="blue"
          onClick={handleRedirectToDiffContracts}
        >
          Ver solicitações de alteração
        </Button>
      )}
      {contract.status === ContractStatus.PENDING &&
        !contract.hasDeleteRequest && (
          <>
            <Button
              variant="solid"
              color="red"
              onClick={() => handleSubscribeContract("NOT_SUBSCRIBE")}
            >
              Recusar
            </Button>
            <Button
              variant="solid"
              color="blue"
              onClick={() => handleSubscribeContract("SUBSCRIBE")}
            >
              Aceitar
            </Button>
          </>
        )}

      {contract.hasDeleteRequest &&
        contract.status === ContractStatus.IN_PROGRESS && (
          <>
            <Button variant="solid" color="red" onClick={handleAcceptDelete}>
              Deletar
            </Button>
            <Button variant="solid" color="blue" onClick={handleRejectDelete}>
              Rejeitar
            </Button>
          </>
        )}
    </div>
  );
}
