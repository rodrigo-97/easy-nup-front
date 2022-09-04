import { yupResolver } from "@hookform/resolvers/yup";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../helpers/Toast";
import { getClients } from "../../../services/Company";
import { createContractualization } from "../../../services/Contractualizations";
import { GoBack } from "../../components/GoBackIcon";
import { Client } from "../../Models/Client";

type ParamProps = {
  name: string;
  fi: number;
};

type ServiceTypes = {
  name: string;
  params: Array<ParamProps>;
};

export type FormProps = {
  name: string;
  effectiveDate: string;
  finishDate: string;
  predictedVolumeFunctionPoint: number;
  clientId: number | string;
  prices: {
    pf: number | undefined;
    ust: number | undefined;
    hh: number | undefined;
  };
  serviceTypes: Array<ServiceTypes>;
};

export function CreateContractualization() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState<Array<Client>>([]);
  const [serviceTypes, setServiceTypes] = useState<
    Array<ServiceTypes>
  >([
    {
      name: "",
      params: [
        {
          fi: 0,
          name: "",
        },
      ],
    },
  ]);

  useEffect(() => {
    getClients()
      .then(({ data }) => setClients(data))
      .catch(() =>
        showErrorToast({
          message: "Não foi possível carregar os seus clientes",
        })
      );
  }, []);

  function validatePrices(val: any) {
    const { pf, hh, ust } = val;

    if (!pf && !hh && !ust) {
      return false;
    }

    return true;
  }

  function validateIfEachNameInServiceTypeIsDifferent(val: any) {
    const nameIsInserviceTypes =
      serviceTypes.filter((e) => e.name === val).length >= 2;

    return !nameIsInserviceTypes;
  }

  function validateIfEachNameInServiceTypeParamsIsDifferent(val: any) {
    const filteredParams = serviceTypes.map((e) => e.params);
    const [hasMoreThanOneSameName] = filteredParams.filter(
      (e) => e.filter((j) => j.name === val).length >= 2
    );

    return !!!hasMoreThanOneSameName;
  }

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Campo obrigatório")
      .min(3, "Precisa ter mais de 3 caracteres"),
    effectiveDate: Yup.date().required("Campo obrigatório"),
    finishDate: Yup.date()
      .required("Campo obrigatório")
      .min(
        format(addDays(new Date(), 1), "yyyy-MM-dd"),
        "A data de precisa ser maior do que a atual (hoje)"
      ),
    predictedVolumeFunctionPoint: Yup.number().required("Campo obrigatório"),
    clientId: Yup.number().required("Campo obrigatório"),
    prices: Yup.object()
      .shape({
        pf: Yup.number().moreThan(0, "Campo obrigatório"),
        ust: Yup.number().moreThan(0, "Campo obrigatório"),
        hh: Yup.number().moreThan(0, "Campo obrigatório"),
      })
      .test(
        "at least one key",
        "Pelo menos um dos valores deve ser informado (pf, ust, hh)",
        validatePrices
      ),
    serviceTypes: Yup.array(
      Yup.object().shape({
        name: Yup.string()
          .required("Campo obrigatório")
          .min(3, "Precisa ter mais de 3 caracteres")
          .test(
            "each name differents",
            "Não pode haver nome de serviços iguais",
            validateIfEachNameInServiceTypeIsDifferent
          ),
        params: Yup.array(
          Yup.object().shape({
            name: Yup.string()
              .required("Campo obrigatório")
              .min(3, "Precisa ter mais de 3 caracteres")
              .test(
                "each name differents",
                "Não pode haver nome de parâmetros iguais dentro de um mesmo tipo de serviço",
                validateIfEachNameInServiceTypeParamsIsDifferent
              ),
            fi: Yup.number()
              .required("Campo obrigatório")
              .moreThan(0, "Campo obrigatório"),
          })
        ),
      })
    ),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      effectiveDate: format(new Date(), "yyyy-MM-dd"),
      finishDate: format(new Date(), "yyyy-MM-dd"),
      serviceTypes: [
        {
          name: "",
          params: [
            {
              fi: 0,
              name: "",
            },
          ],
        },
      ],
      clientId: undefined,
      name: "",
      predictedVolumeFunctionPoint: undefined,
      prices: {
        pf: undefined,
        hh: undefined,
        ust: undefined,
      },
    },
  });

  function getParamMessageError(i: number, paramIndex: number, fieldName: string) {
    const hasserviceTypes =
      errors.serviceTypes && errors.serviceTypes[i];

    if (hasserviceTypes?.params) {
      if (fieldName === "name")
        return hasserviceTypes.params[paramIndex]?.name?.message;
      if (fieldName === "fi")
        return hasserviceTypes.params[paramIndex]?.fi?.message;
    }

    return "";
  }

  const emptyServiceType = {
    name: "",
    params: [
      {
        fi: 0,
        name: "",
      },
    ],
  };

  const emptyParam = {
    fi: 0,
    name: "",
  };

  function onSubmit(data: FormProps) {
    setIsLoading(true);
    createContractualization(data)
      .then(() => {
        showSuccessToast({ message: "Contratualização criada com sucesso" });
        navigate(-1);
      })
      .catch(() => {
        showErrorToast({ message: "Não foi possível criar contratualização" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function addServiceType() {
    setServiceTypes([...serviceTypes, emptyServiceType]);
  }

  function removeServiceType(i: number) {
    const size = serviceTypes.length;

    if (size > 1) {
      serviceTypes.splice(i, 1);
      setServiceTypes([...serviceTypes]);
      setValue("serviceTypes", serviceTypes);
    } else {
      showErrorToast({
        message:
          "Não é possível deixar uma contratualização sem um tipo de serviço",
      });
    }
  }

  function addParamToServiceType(i: number) {
    serviceTypes[i].params.push(emptyParam);
    setServiceTypes([...serviceTypes]);
  }

  function removeParamFromServiceType(
    serviceTypeindex: number,
    paramIndex: number
  ) {
    const size = serviceTypes[serviceTypeindex].params.length;
    if (size > 1) {
      serviceTypes[serviceTypeindex].params.splice(paramIndex, 1);
      setServiceTypes([...serviceTypes]);
    } else {
      showErrorToast({
        message: "Não é possível deixar um tipo de serviço sem parâmetros",
      });
    }
  }

  useEffect(() => {
    const sideEffect = serviceTypes.forEach((e, i) => {
      setValue(`serviceTypes.${i}.name`, e.name);
      e.params.forEach((j, pi) => {
        setValue(`serviceTypes.${i}.params.${pi}.name`, j.name);
        setValue(`serviceTypes.${i}.params.${pi}.fi`, j.fi);
      });
    });

    return sideEffect;
  }, [serviceTypes]);

  return (
    <Row className="gx-2 custom-form">
      <GoBack text="Criar nova contratualização" />

      <div className="p-4 app-bg">
        <Row>
          <small className="mb-3">Informações do contrato</small>
          <Col md={6} lg={6}>
            <FormGroup floating>
              <Controller
                control={control}
                name="name"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      invalid={!!errors.name}
                      placeholder="Nome"
                      type="text"
                    />
                  );
                }}
              />
              <Label>Name</Label>
              <FormFeedback>{errors.name?.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6} lg={3}>
            <FormGroup floating>
              <Controller
                control={control}
                name="effectiveDate"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      invalid={!!errors.effectiveDate}
                      placeholder="Data de firmamento"
                      type="date"
                    />
                  );
                }}
              />
              <Label>Data de vigência</Label>
              <FormFeedback>{errors.effectiveDate?.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6} lg={3}>
            <FormGroup floating>
              <Controller
                control={control}
                name="finishDate"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      invalid={!!errors.finishDate}
                      placeholder="Data de finalização"
                      type="date"
                    />
                  );
                }}
              />
              <Label>Data de Finalização</Label>
              <FormFeedback>{errors.finishDate?.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6} lg={7}>
            <FormGroup floating>
              <Controller
                control={control}
                name="clientId"
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      invalid={!!errors.clientId}
                      placeholder="Cliente"
                      type="select"
                    >
                      <option value="">Selecione um cliente</option>
                      {clients.map((e) => {
                        return <option value={e.id}>{e.user.name}</option>;
                      })}
                    </Input>
                  );
                }}
              />
              <Label>Cliente</Label>
              <FormFeedback>{errors.clientId?.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6} lg={5}>
            <FormGroup floating>
              <NumberFormat
                className={`form-control ${!!errors.predictedVolumeFunctionPoint ? "is-invalid" : ""
                  }`}
                decimalSeparator=","
                decimalScale={0}
                allowNegative={false}
                isAllowed={({ floatValue }) => {
                  if (floatValue && floatValue >= 99999999) {
                    return false;
                  }
                  return true;
                }}
                placeholder="Total estimado de pontos de função"
                onValueChange={(values) => {
                  const { value } = values;
                  setValue("predictedVolumeFunctionPoint", +value);
                }}
              />
              <Label>Total estimado de pontos de função</Label>
              <FormFeedback>
                {errors.predictedVolumeFunctionPoint?.message}
              </FormFeedback>
            </FormGroup>
          </Col>

          <Col sm={12}>
            <small>Preços</small>
          </Col>
          <Col md={6} lg={4}>
            <FormGroup floating>
              <NumberFormat
                className={`form-control ${!!errors.prices?.pf?.message || !!errors.prices?.message
                  ? "is-invalid"
                  : ""
                  }`}
                decimalSeparator=","
                decimalScale={2}
                allowNegative={false}
                isAllowed={({ floatValue }) => {
                  if (floatValue && floatValue >= 9999999) {
                    return false;
                  }
                  return true;
                }}
                prefix={"R$ "}
                placeholder="Valor do ponto de função"
                onValueChange={(values) => {
                  const { value } = values;

                  if (+value === 0) {
                    setValue("prices.pf", undefined);
                  } else {
                    setValue("prices.pf", +value);
                  }
                }}
              />
              <Label>Valor do ponto de função</Label>
              <FormFeedback>
                {errors.prices?.pf?.message || errors.prices?.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6} lg={4}>
            <FormGroup floating>
              <Controller
                control={control}
                name="prices.ust"
                render={() => {
                  return (
                    <NumberFormat
                      className={`form-control ${!!errors.prices?.ust || !!errors.prices
                        ? "is-invalid"
                        : ""
                        }`}
                      decimalSeparator=","
                      decimalScale={2}
                      allowNegative={false}
                      isAllowed={({ floatValue }) => {
                        if (floatValue && floatValue >= 9999999) {
                          return false;
                        }
                        return true;
                      }}
                      prefix={"R$ "}
                      placeholder="Valor Ust"
                      onValueChange={(values) => {
                        const { value } = values;

                        if (+value === 0) {
                          setValue("prices.ust", undefined);
                        } else {
                          setValue("prices.ust", +value);
                        }
                      }}
                    />
                  );
                }}
              />
              <Label>Valor Ust</Label>
              <FormFeedback>
                {errors.prices?.ust?.message || errors.prices?.message}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6} lg={4}>
            <FormGroup floating>
              <NumberFormat
                className={`form-control ${!!errors.prices?.hh?.message || !!errors.prices
                  ? "is-invalid"
                  : ""
                  }`}
                decimalSeparator=","
                decimalScale={2}
                allowNegative={false}
                isAllowed={({ floatValue }) => {
                  if (floatValue && floatValue >= 9999999) {
                    return false;
                  }
                  return true;
                }}
                prefix={"R$ "}
                placeholder="Valor homem hora"
                onValueChange={(values) => {
                  const { value } = values;

                  if (+value === 0) {
                    setValue("prices.hh", undefined);
                  } else {
                    setValue("prices.hh", +value);
                  }
                }}
              />
              <Label>Valor homem hora</Label>
              <FormFeedback>
                {errors.prices?.hh?.message || errors.prices?.message}
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
      </div>

      {serviceTypes.map((e, i) => {
        return (
          <div className="app-bg p-4 mt-4" key={i}>
            <Row key={i}>
              <div className="d-flex gap-3 col-12">
                <small className="mb-3 text-truncate">
                  Tipo de serviço {i + 1}
                </small>
                <small
                  className="pointer text-primary-700 text-truncate"
                  title={`Clique para adicionar novo parâmetro ao tipo de parâmetro ${i + 1
                    }`}
                  onClick={() => addParamToServiceType(i)}
                >
                  adicionar parâmetro
                </small>
                <div className="d-flex align-items-start">
                  <small
                    className="pointer text-red text-truncate"
                    title={`Clique para remover o tipo de parâmetro ${i + 1}`}
                    onClick={() => removeServiceType(i)}
                  >
                    remover
                  </small>
                </div>
              </div>
              <Col sm={12}>
                <FormGroup floating>
                  <Controller
                    control={control}
                    name={`serviceTypes.${i}.name`}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          invalid={
                            errors.serviceTypes &&
                            !!errors.serviceTypes[i]?.name
                          }
                          onChange={(e) => {
                            serviceTypes[i].name = e.target.value;
                            setServiceTypes([...serviceTypes]);
                          }}
                          placeholder="Nome"
                          type="text"
                        />
                      );
                    }}
                  />
                  <Label>Nome</Label>
                  <FormFeedback>
                    {errors.serviceTypes &&
                      errors.serviceTypes[i]?.name?.message}
                  </FormFeedback>
                </FormGroup>
                <p>
                  {errors.serviceTypes &&
                    !!errors.serviceTypes[i]?.message}
                </p>
              </Col>
              {e.params.map((_p, paramIndex) => {
                return (
                  <Row key={paramIndex}>
                    <div className="d-flex justify-content-end">
                      <small
                        className="text-red text-end pointer mb-1"
                        title={`Clique para remover o parâmetro ${paramIndex + 1
                          } do tipo de serviço ${i + 1}`}
                        onClick={() =>
                          removeParamFromServiceType(i, paramIndex)
                        }
                      >
                        remover
                      </small>
                    </div>
                    <Col md={6}>
                      <FormGroup floating>
                        <Controller
                          control={control}
                          name={`serviceTypes.${i}.params.${paramIndex}.name`}
                          render={({ field }) => {
                            return (
                              <Input
                                {...field}
                                className={
                                  !!getParamMessageError(i, paramIndex, "name")
                                    ? "is-invalid"
                                    : ""
                                }
                                onChange={(e) => {
                                  serviceTypes[i].params[paramIndex].name =
                                    e.target.value;
                                  setServiceTypes([...serviceTypes]);
                                }}
                                placeholder="Nome do parâmetro"
                                type="text"
                              />
                            );
                          }}
                        />
                        <Label>Nome do parâmetro</Label>
                        <FormFeedback>
                          {getParamMessageError(i, paramIndex, "name")}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup floating>
                        <NumberFormat
                          className={`form-control ${!!getParamMessageError(i, paramIndex, "fi")
                            ? "is-invalid"
                            : ""
                            }`}
                          decimalSeparator=","
                          decimalScale={2}
                          allowNegative={false}
                          isAllowed={({ floatValue }) => {
                            if (floatValue && floatValue > 100) {
                              return false;
                            }
                            return true;
                          }}
                          placeholder="Valor do ajuste"
                          onValueChange={(values) => {
                            const { value } = values;
                            setValue(
                              `serviceTypes.${i}.params.${paramIndex}.fi`,
                              +value
                            );

                            serviceTypes[i].params[paramIndex].fi = +value;
                            setServiceTypes([...serviceTypes]);
                          }}
                        />
                        <Label>Valor de ajuste %</Label>
                        <FormFeedback>
                          {getParamMessageError(i, paramIndex, "fi")}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                );
              })}
            </Row>
          </div>
        );
      })}

      <Col sm={12} className="d-flex align-items-center mt-4 gap-3 ">
        <div>
          <Button
            color="primary-700"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading && <Spinner size="sm" className="me-2" />}
            {isLoading
              ? "Salvando contratualização..."
              : "Salvar contratualização"}
          </Button>
        </div>
        <small
          className="pointer text-primary-700"
          title="Clique para adicionar um novo tipo de serviço"
          onClick={addServiceType}
        >
          Adicionar tipo de serviço
        </small>
      </Col>
    </Row>
  );
}
