import React, { useEffect, useState } from "react";
import { FaFileContract } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Badge, Col, Row } from "reactstrap";
import { formatCurrency } from "../../../helpers/CurrencyFormater";
import { showErrorToast } from "../../../helpers/Toast";
import { getContractualizationById } from "../../../services/Contractualizations";
import { GoBack } from "../../components/GoBackIcon";
import { Loading } from "../../components/Loading";
import { Contractualization } from "../../Models/Contractualization";
import { ptBR } from 'date-fns/locale'
import { setDefaultOptions } from "date-fns/esm";
import { format } from "date-fns";

export function ViewContract() {
  const [contractualization, setContractualization] =
    useState<Contractualization>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const effectiveDate =
    contractualization &&
    new Date(contractualization?.contract.effectiveDate).toLocaleDateString(
      "pt-BR"
    );
  const finishDate =
    contractualization &&
    new Date(contractualization?.contract.finishDate).toLocaleDateString(
      "pt-BR"
    );
  const hadReajust =
    contractualization &&
    contractualization.contract.prices.filter((e) => e.isFromReajust).length >=
    1;
  const hadRenegotiation =
    contractualization &&
    contractualization.contract.prices.filter((e) => e.isFromRenegotiation)
      .length >= 1;

  const client = contractualization?.client.user;
  const prices = contractualization?.contract.prices;
  const maintenanceTypes = contractualization?.contract.maintenanceTypes;

  setDefaultOptions({
    locale: ptBR
  })

  const formatedDate = (date?: Date) => {
    if (!date) return ''

    return format(new Date(date), "dd 'de' LLLL 'de' yyyy")
  }

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getContractualizationById(+id)
        .then(({ data }) => {
          setContractualization(data);
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
    <Row>
      <Col sm={12} lg={10}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <GoBack text={contractualization?.contract.name!} />

            <div className="app-bg p-4">
              <b>Dados básicos</b>

              <div className=" mt-3">
                <small>Nome</small>
                <p>{contractualization?.contract.name}</p>
              </div>

              <div className="mt-3">
                <small>Volume estimado de pontos de função</small>
                <p>{contractualization?.contract.predictedVolumeFunctionPoint}</p>
              </div>

              <div className="d-flex gap-5">
                <div className="mt-3 w-25">
                  <small>Houve reajuste</small>
                  <p>{hadReajust ? "Sim" : "Não"}</p>
                </div>

                <div className="mt-3">
                  <small>Houve renegociação</small>
                  <p>{hadRenegotiation ? "Sim" : "Não"}</p>
                </div>
              </div>

              <div className="d-flex gap-5">
                <div className="mt-3 w-25">
                  <small>Data de vigência</small>
                  <p>{formatedDate(contractualization?.contract.effectiveDate)}</p>
                </div>

                <div className="mt-3">
                  <small>Data de finalização</small>
                  <p>{formatedDate(contractualization?.contract.finishDate)}</p>
                </div>
              </div>
            </div>

            <div className="app-bg p-4 mt-4">
              <b>Dados do cliente</b>
              {
                client && (
                  <div className="d-flex gap-5 mt-3">
                    <div className="w-25">
                      <small>Nome do cliente</small>
                      <p>{client.name}</p>
                    </div>

                    <div>
                      <small>E-mail</small>
                      <p>
                        <a
                          href={`mailto:${client.email!}`}
                          className="text-primary-700"
                        >
                          {client.email!}
                        </a>
                      </p>
                    </div>
                  </div>
                )
              }
            </div>

            <div className="app-bg p-4 mt-4">
              <b>Tipos de serviços</b>

              <div className="mt-3">
                {maintenanceTypes &&
                  maintenanceTypes.map((m) => {
                    return (
                      <div key={m.id}>
                        <div>
                          <small>Nome</small>
                          <p>{m.name}</p>
                        </div>

                        <div className="mt-3">
                          <small>Parâmetros</small>
                          <div>
                            {m.params.map((p) => {
                              return (
                                <div className="d-flex mb-3" key={p.id}>
                                  <div className="w-50">
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
            </div>

            <div className="app-bg p-4 mt-4">
              <div className="d-flex justify-content-between">
                <b>Histórico de preços</b>
                <small>Obs* O primeiro preço é o vigente na atualidade</small>
              </div>

              {prices &&
                prices.map((p) => {
                  return (
                    <div className="d-flex justify-content-between flex-wrap mt-3" key={p.id}>
                      <div>
                        <small>Pf</small>
                        <p>{formatCurrency(p.pf)}</p>
                      </div>
                      <div>
                        <small>UST</small>
                        <p>{formatCurrency(p.ust)}</p>
                      </div>
                      <div>
                        <small>Hh</small>
                        <p>{formatCurrency(p.hh)}</p>
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
                      <hr className="w-100" />
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </Col>
    </Row>
  );
}
