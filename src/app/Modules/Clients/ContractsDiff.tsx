import { Button } from "@vechaiui/react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../helpers/Toast";
import { GoBack } from "../../Components/GoBackIcon";
import { TwContainer } from "../../Components/Tailwind/Container";
import { Contract } from "../../Models/Contract";
import { acceptUpdate, rejectUpdate } from "../../services/Client";
import { getContractualizationById } from "../../services/Contractualizations";

export function ContractsDiff() {
  const [contract, setContract] = useState<Contract>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    id &&
      getContractualizationById(+id)
        .then(({ data }) => {
          setContract(data);
        })
        .catch(() => {
          showErrorToast({ message: "Não foi possível buscar contrato" });
        });
  }, []);

  const lastVersion =
    contract &&
    (JSON.parse(contract.versions[0].serializedContract) as Contract);

  function getFormatedDate(date: Date) {
    return format(new Date(date), "dd 'de' LLLL 'de' yyyy");
  }

  function handleGoBack() {
    navigate(-1);
  }

  function handleRejectUpdate() {
    contract &&
      rejectUpdate({
        clientId: contract?.client.id,
        companyId: contract?.company.id,
        contractId: contract?.id,
      })
        .then(() => {
          handleGoBack();
          showSuccessToast({ message: "Solicitação rejeitada" });
        })
        .catch(() =>
          showErrorToast({ message: "Não foi possível rejeitar alterações" })
        );
  }

  function handleAcceptUpdate() {
    contract &&
      acceptUpdate({
        clientId: contract?.client.id,
        companyId: contract?.company.id,
        contractId: contract?.id,
      })
        .then(() => {
          handleGoBack();
          showSuccessToast({ message: "Solicitação aceita" });
        })
        .catch(() =>
          showErrorToast({ message: "Não foi possível aceitar alterações" })
        );
  }

  return (
    <TwContainer>
      <GoBack text={`Solicitação de alteração`} />
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg grid grid-cols-2 mt-10">
        {contract && lastVersion && (
          <>
            <div className="space-y-5">
              <p className="text-xl">Versão atual</p>

              <div>
                <small>Nome</small>
                <p>{lastVersion?.name}</p>
              </div>

              <div>
                <small>Data de início</small>
                <p> {getFormatedDate(lastVersion.effectiveDate)}</p>
              </div>

              <div>
                <small>Data de fim</small>
                <p> {getFormatedDate(lastVersion.finishDate)}</p>
              </div>

              <div>
                <small>Volume esperado de pontos de função</small>
                <p> {getFormatedDate(lastVersion.finishDate)}</p>
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-xl truncate">Alteração sugerida</p>

              <div>
                <small>Nome</small>
                <p>{contract?.name}</p>
              </div>

              <div>
                <small>Data de início</small>
                <p>{getFormatedDate(contract.effectiveDate)}</p>
              </div>

              <div>
                <small>Data de fim</small>
                <p> {getFormatedDate(contract.finishDate)}</p>
              </div>

              <div>
                <small>Volume esperado de pontos de função</small>
                <p> {getFormatedDate(contract.finishDate)}</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-3 flex justify-end space-x-3">
        <Button variant="solid" color="red" onClick={handleRejectUpdate}>
          Recusar
        </Button>
        <Button variant="solid" color="blue" onClick={handleAcceptUpdate}>
          Aceitar
        </Button>
      </div>
    </TwContainer>
  );
}
