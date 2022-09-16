import { Button } from "@vechaiui/react";
import { format } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showConfirmAction, showErrorToast, showSuccessToast } from "../../../helpers/Toast";
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

  const currentVersion =
    contract &&
    (JSON.parse(contract.versions[0].serializedContract) as Contract);

  const requestVersion =
    contract &&
    (JSON.parse(contract.versions[0].requestedContractSerialized));

  function getFormatedDate(date: Date) {
    return format(new Date(date), "dd 'de' LLLL 'de' yyyy");
  }

  function handleGoBack() {
    navigate(-1);
  }

  function handleRejectUpdate() {
    contract &&
      showConfirmAction({
        title: "Confirmar ação",
        text: "Você tem certeza que deseja rejeitar a atualização do contrato?",
        btnConfirmText: "Sim, desejo rejeitar as atualizações do contrato",
        onConfirm: () =>
          rejectUpdate({
            clientId: String(contract?.client.id),
            companyId: String(contract?.company.id),
            contractId: contract?.id,
          })
            .then(() => {
              handleGoBack();
              showSuccessToast({ message: "Solicitação rejeitada" });
            })
            .catch(() =>
              showErrorToast({ message: "Não foi possível rejeitar alterações" })
            ),
      })
  }

  function handleAcceptUpdate() {
    contract &&
      showConfirmAction({
        title: "Confirmar ação",
        text: "Você realmente deseja aceitar a alteração no contrato?",
        btnConfirmText: "Sim, eu desejo aceitar as alterações",
        onConfirm: () => acceptUpdate({
          clientId: String(contract?.client.id),
          companyId: String(contract?.company.id),
          contractId: contract?.id,
        })
          .then(() => {
            handleGoBack();
            showSuccessToast({ message: "Solicitação aceita" });
          })
          .catch(() =>
            showErrorToast({ message: "Não foi possível aceitar alterações" })
          )
      })
  }

  return (
    <TwContainer>
      <GoBack text={`Solicitação de alteração`} />
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg grid grid-cols-2 mt-10">
        {contract && currentVersion && requestVersion && (
          <>
            <div className="space-y-5">
              <p className="text-xl">Versão atual</p>

              <div>
                <small>Nome</small>
                <p>{currentVersion?.name}</p>
              </div>

              <div>
                <small>Data de início</small>
                <p> {getFormatedDate(currentVersion.effectiveDate)}</p>
              </div>

              <div>
                <small>Data de fim</small>
                <p> {getFormatedDate(currentVersion.finishDate)}</p>
              </div>

              <div>
                <small>Volume esperado de pontos de função</small>
                <p>{currentVersion.predictedVolumeFunctionPoint}</p>
              </div>

              <div>
                <small>Preço pf</small>
                <p>{currentVersion.prices[0].pf}</p>
              </div>

              <div>
                <small>Preço ust</small>
                <p>{currentVersion.prices[0].ust}</p>
              </div>

              <div>
                <small>Preço hh</small>
                <p>{currentVersion.prices[0].hh}</p>
              </div>

              <div>
                <small>Tipo de serviços</small>
                {currentVersion.serviceTypes.map((s) => {
                  return (
                    <Fragment key={s.id}>
                      <div>
                        <small>nome</small>
                        <p>{s.name}</p>
                      </div>

                      <div className="mt-3">
                        <small>Parâmetros</small>
                        {
                          s.params.map((p) => {
                            return (
                              <div key={id}>
                                <div>
                                  <small>Nome</small>
                                  <p>{p.name}</p>
                                </div>

                                <div>
                                  <small>fi</small>
                                  <p>{p.fi}</p>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </Fragment>
                  )
                })}
              </div>
            </div>

            <div className="space-y-5">
              <p className="text-xl truncate">Alteração sugerida</p>

              <div>
                <small>Nome</small>
                <p>{requestVersion?.name}</p>
              </div>

              <div>
                <small>Data de início</small>
                <p>{getFormatedDate(requestVersion.effectiveDate)}</p>
              </div>

              <div>
                <small>Data de fim</small>
                <p> {getFormatedDate(requestVersion.finishDate)}</p>
              </div>

              <div>
                <small>Volume esperado de pontos de função</small>
                <p> {requestVersion?.predictedVolumeFunctionPoint}</p>
              </div>

              <div>
                <small>Preço pf</small>
                <p>{requestVersion.prices.pf}</p>
              </div>

              <div>
                <small>Preço ust</small>
                <p>{requestVersion.prices.ust}</p>
              </div>

              <div>
                <small>Preço hh</small>
                <p>{requestVersion.prices.hh}</p>
              </div>

              <div>
                <small>Tipo de serviços</small>
                {requestVersion.serviceTypes.map((s: any) => {
                  return (
                    <Fragment key={s.id}>
                      <div>
                        <small>nome</small>
                        <p>{s.name}</p>
                      </div>

                      <div className="mt-3">
                        <small>Parâmetros</small>
                        {
                          s.params.map((p: any) => {
                            return (
                              <div key={id}>
                                <div>
                                  <small>Nome</small>
                                  <p>{p.name}</p>
                                </div>

                                <div>
                                  <small>fi</small>
                                  <p>{p.fi}</p>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </Fragment>
                  )
                })}
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
