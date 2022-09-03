import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { formatCurrency } from "../../../helpers/CurrencyFormater";
import { showErrorToast } from "../../../helpers/Toast";
import { getContractualizationById } from "../../../services/Contractualizations";
import { GoBack } from "../../components/GoBackIcon";
import { Loading } from "../../components/Loading";
import { Contractualization } from "../../Models/Contractualization";

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
            <div className="d-flex gap-2 flex-column">
              <Row className="g-3 border px-3 rounded pb-3">
                <Col sm={12}>
                  <small>Nome</small>
                  <p>{contractualization?.contract.name}</p>
                </Col>
                <small>Cliente</small>
                {client && (
                  <Col sm={12}>
                    <div className="d-flex gap-2">
                      <img
                        src={client.avatarUrl!}
                        alt="Imagem de perfil do cliente"
                        className="rounded"
                      />
                      <div>
                        <p>
                          <b>Nome: </b>
                          {client.name!}
                        </p>
                        <span>
                          <b>E-mail: </b>
                          <a
                            href={`mailto:${client.email!}`}
                            className="text-primary-700"
                          >
                            {client.email!}
                          </a>
                        </span>
                      </div>
                    </div>
                  </Col>
                )}
                <Col sm={4}>
                  <small>Houve reajuste</small>
                  <p>{hadReajust ? "Sim" : "Não"}</p>
                </Col>
                <Col sm={4}>
                  <small>Houve renegociação</small>
                  <p>{hadRenegotiation ? "Sim" : "Não"}</p>
                </Col>
              </Row>

              <Row className="g-3 border px-3 rounded pb-3">
                <Col sm={4}>
                  <small>Data de vigência</small>
                  <p>{effectiveDate}</p>
                </Col>
                <Col sm={4}>
                  <small>Data de finalização</small>
                  <p>{finishDate}</p>
                </Col>
              </Row>

              <Row className="g-3 border px-3 rounded pb-3 rounded">
                <small>Histórico de preços</small>

                {prices &&
                  prices.map((p) => {
                    return (
                      <React.Fragment key={p.id}>
                        <Col sm={2}>
                          <small>Pf</small>
                          <p>{formatCurrency(p.pf)}</p>
                        </Col>
                        <Col sm={2}>
                          <small>UST</small>
                          <p>{formatCurrency(p.ust)}</p>
                        </Col>
                        <Col sm={2}>
                          <small>Hh</small>
                          <p>{formatCurrency(p.hh)}</p>
                        </Col>
                        <Col sm={2}>
                          <small>% reajuste Pf</small>
                          <p>{p.pfReajustPercentage ?? "Não definido"}</p>
                        </Col>
                        <Col sm={2}>
                          <small>% reajuste Ust</small>
                          <p>{p.ustReajustPercentage ?? "Não definido"}</p>
                        </Col>
                        <Col sm={2}>
                          <small>% reajuste do Hh</small>
                          <p>{p.hhReajustPercentage ?? "Não definido"}</p>
                        </Col>
                        <hr />
                      </React.Fragment>
                    );
                  })}
              </Row>

              <Row className="g-3 border rounded pb-3 px-3 rounded">
                <small>Tipos de manutenção</small>

                {maintenanceTypes &&
                  maintenanceTypes.map((m) => {
                    return (
                      <React.Fragment key={m.id}>
                        <Col sm={12}>
                          <small>Nome</small>
                          <p>{m.name}</p>
                        </Col>
                        <div className="">
                          <small>Parâmetros</small>
                          <Row className="border rounded p-4 gap-3">
                            {m.params.map((p) => {
                              return (
                                <React.Fragment key={p.id}>
                                  <Col sm={5}>
                                    <small>Nome</small>
                                    <p>{p.name}</p>
                                  </Col>
                                  <Col sm={5}>
                                    <small>Função de ajuste (fi)</small>
                                    <p>{p.fi}</p>
                                  </Col>
                                </React.Fragment>
                              );
                            })}
                          </Row>
                        </div>
                        <hr />
                      </React.Fragment>
                    );
                  })}
              </Row>
            </div>
          </>
        )}
      </Col>
    </Row>
  );
}
