import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { formatCurrency } from "../../../helpers/CurrencyFormater";
import { showErrorToast } from "../../../helpers/Toast";
import { GoBack } from "../../Components/GoBackIcon";
import { Loading } from "../../Components/Loading";
import { TwContainer } from "../../Components/Tailwind/Container";
import { Contract } from "../../Models/Contract";
import { ClientContractOptions } from "./Components/ClientContractOptions";
import { HistoryBlock } from "./Components/HistoryBlock";
import msk from "msk";
import { CompanyContractOptions } from "./Components/CompanyContractOptions";
import { getContractualizationById } from "../../services/Contractualizations";

export function ViewContract() {
  const [contract, setContract] = useState<Contract>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { isCompany } = useUser();

  const hadReajust =
    contract && contract.prices.filter((e) => e.isFromReajust).length >= 1;
  const hadRenegotiation =
    contract &&
    contract.prices.filter((e) => e.isFromRenegotiation).length >= 1;

  const client = contract?.client?.user;
  const company = contract?.company;
  const prices = contract?.prices;
  const serviceTypes = contract?.serviceTypes;

  const formatedDate = (date?: Date) => {
    if (!date) return "";

    return format(new Date(date), "dd 'de' LLLL 'de' yyyy 'às' hh:mm");
  };

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
      {isLoading && !contract ? (
        <Loading />
      ) : (
        <>
          <GoBack text={contract?.name!} />

          <TwContainer className="p-4 mt-10 bg-white dark:bg-gray-700 rounded-lg">
            <b>Dados básicos</b>

            <div className=" mt-3">
              <small>Nome</small>
              <p>{contract?.name}</p>
            </div>

            <div className="mt-3">
              <small>Volume estimado de pontos de função</small>
              <p>{contract?.predictedVolumeFunctionPoint}</p>
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
                <p>{formatedDate(contract?.effectiveDate)}</p>
              </div>

              <div className="mt-3">
                <small>Data de finalização</small>
                <p>{formatedDate(contract?.finishDate)}</p>
              </div>
            </div>
          </TwContainer>

          <TwContainer className="p-4 mt-4 bg-white dark:bg-gray-700 rounded-lg">
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

          <TwContainer className="p-4 mt-4 bg-white dark:bg-gray-700 rounded-lg">
            <b>Dados da empresa</b>
            {company && (
              <div className="grid grid-cols-2 gap-y-3 mt-3">
                <div>
                  <small>Nome da empresa</small>
                  <p>{company.user?.name}</p>
                </div>

                <div>
                  <small>E-mail</small>
                  <p>
                    <a
                      href={`mailto:${company.user?.email!}`}
                      className="text-blue-400"
                    >
                      {company.user?.email!}
                    </a>
                  </p>
                </div>

                <div>
                  <small>CNPJ</small>
                  <p>{msk(company.socialCode, "99.999.999/9999-99")}</p>
                </div>

                <div>
                  <small>Razão social</small>
                  <p>{company.socialName}</p>
                </div>
              </div>
            )}
          </TwContainer>

          <TwContainer className="p-4 mt-4 bg-white dark:bg-gray-700 rounded-lg">
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

          <TwContainer className="p-4 mt-4 bg-white dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between flex-wrap">
              <b>Histórico de preços</b>
              <small>Obs* O primeiro preço é o vigente na atualidade</small>
            </div>

            {prices &&
              prices.map((p) => {
                return (
                  <HistoryBlock key={p.id}>
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

          {!isCompany && contract && (
            <div className="w-full lg:w-8/12 mt-5">
              <ClientContractOptions contract={contract} />
            </div>
          )}

          {isCompany && contract && (
            <div className="w-full lg:w-8/12 mt-5">
              <CompanyContractOptions contract={contract} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
