import { Button } from "@vechaiui/react";
import { useNavigate } from "react-router-dom";
import { ContractStatus } from "../../../../enums/ContractStatus";
import { showErrorToast, showSuccessToast } from "../../../../helpers/Toast";
import { Contract } from "../../../Models/Contract";
import { subscribeContract } from "../../../services/Client";

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
      .catch((err) =>
        showErrorToast({ message: "Não foi possível alterar contratualização" })
      );
  }

  function handleRedirectToDiffContracts() {
    navigate(`/contracts/diff/${contract.id}`);
  }

  return (
    <div className="flex justify-end space-x-3">
      {contract.hasChangeRequest && (
        <Button
          variant="outline"
          color="blue"
          onClick={handleRedirectToDiffContracts}
        >
          Ver solicitações de alteração
        </Button>
      )}
      {contract.status === ContractStatus.PENDING && (
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
    </div>
  );
}
