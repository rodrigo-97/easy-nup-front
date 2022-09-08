import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { formatCurrency } from "../../../helpers/CurrencyFormater";
import { showErrorToast } from "../../../helpers/Toast";
import { getContractualizationById } from "../../../services/Contractualizations";
import { GoBack } from "../../Components/GoBackIcon";
import { Loading } from "../../Components/Loading";
import { Box } from "../../Components/Tailwind/Box";
import { TwContainer } from "../../Components/Tailwind/Container";
import { Contract } from "../../Models/Contract";
import { ClientContractOptions } from "./Components/ClientContractOptions";
import { HistoryBlock } from "./Components/HistoryBlock";

export function ViewContract() {
  const [contract, setContract] =
    useState<Contract>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { isCompany } = useUser()

  const hadReajust =
    contract &&
    contract.prices.filter((e) => e.isFromReajust)
      .length >= 1;
  const hadRenegotiation =
    contract &&
    contract.prices.filter((e) => e.isFromRenegotiation)
      .length >= 1;

  const client = contract?.client?.user;
  const prices = contract?.prices;
  const serviceTypes = contract?.serviceTypes;

  const formatedDate = (date?: Date) => {
    if (!date) return "";

    return format(new Date(date), "dd 'de' LLLL 'de' yyyy 'as' hh:mm");
  };

  console.log(contract)

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getContractualizationById(+id)
        .then(({ data }) => {
          setContract(data);
        })
        .catch(() => {
          showErrorToast({
            message: "Não foi possível buscar contratualização",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div>
      {(isLoading && !contract) ? (
        <Loading />
      ) : (
        <>
          <GoBack text={contract?.name!} />

          <TwContainer className="p-4 mt-10">
            <b>Dados básicos</b>

            <div className=" mt-3">
              <small>Nome</small>
              <p>{contract?.name}</p>
            </div>

            <div className="mt-3">
              <small>Volume estimado de pontos de função</small>
              <p>
                {contract?.predictedVolumeFunctionPoint}
              </p>
            </div>

            <div className="flex">
              <div className="mt-3 w-1/2">
                <small>Houve reajuste</small>
                <p>{hadReajust ? "Sim" : "Não"}</p>
              </div>

              <div className="mt-3">
                <small>Houve renegociação</small>
                <p>{hadRenegotiation ? "Sim" : "Não"}</p>
              </div>
            </div>

            <div className="flex">
              <div className="mt-3 w-1/2">
                <small>Data de vigência</small>
                <p>
                  {formatedDate(contract?.effectiveDate)}
                </p>
              </div>

              <div className="mt-3">
                <small>Data de finalização</small>
                <p>{formatedDate(contract?.finishDate)}</p>
              </div>
            </div>
          </TwContainer>

          <TwContainer className="p-4 mt-4">
            <b>Dados do cliente</b>
            {client && (
              <div className="flex mt-3">
                <div className="w-1/2">
                  <small>Nome do cliente</small>
                  <p>{client.name}</p>
                </div>

                <div>
                  <small>E-mail</small>
                  <p>
                    <a
                      href={`mailto:${client.email!}`}
                      className="text-blue-400"
                    >
                      {client.email!}
                    </a>
                  </p>
                </div>
              </div>
            )}
          </TwContainer>

          <TwContainer className="p-4 mt-4">
            <b>Tipos de serviços</b>

            <div className="mt-3">
              {serviceTypes &&
                serviceTypes.map((m) => {
                  return (
                    <div key={m.id}>
                      <div>
                        <small>Nome</small>
                        <p>{m.name}</p>
                      </div>

                      <div className="mt-3">
                        <small>Parâmetros</small>
                        <div className="">
                          {m.params.map((p) => {
                            return (
                              <div className="flex mb-3" key={p.id}>
                                <div className="w-1/2">
                                  <small>Nome</small>
                                  <p>{p.name}</p>
                                </div>
                                <div>
                                  <small>Função de ajuste (fi)</small>
                                  <p>{p.fi}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
            </div>
          </TwContainer>

          <TwContainer className="p-4 mt-4">
            <div className="flex justify-between flex-wrap">
              <b>Histórico de preços</b>
              <small>Obs* O primeiro preço é o vigente na atualidade</small>
            </div>

            {prices &&
              prices.map((p) => {
                return (
                  <HistoryBlock
                    key={p.id}
                  >
                    <div>
                      <small>Pf</small>
                      <p>{formatCurrency(p.pf) ?? "- "}</p>
                    </div>
                    <div>
                      <small>UST</small>
                      <p>{formatCurrency(p.ust) ?? "-"}</p>
                    </div>
                    <div>
                      <small>Hh</small>
                      <p>{formatCurrency(p.hh) ?? "-"}</p>
                    </div>
                    <div>
                      <small>% Pf</small>
                      <p>{p.pfReajustPercentage ?? "-"}</p>
                    </div>
                    <div>
                      <small>% Ust</small>
                      <p>{p.ustReajustPercentage ?? "-"}</p>
                    </div>
                    <div>
                      <small>% do Hh</small>
                      <p>{p.hhReajustPercentage ?? "-"}</p>
                    </div>
                  </HistoryBlock>
                );
              })}
          </TwContainer>

          {
            (!isCompany && contract) && (
              <div className="w-full lg:w-8/12 mt-5">
                <ClientContractOptions contract={contract} />
              </div>
            )
          }
        </>
      )
      }
    </div >
  );
}
