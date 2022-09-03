import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
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
import { showErrorToast, showSuccessToast } from "../../../helpers/Toast";
import { GoBack } from "../../components/GoBackIcon";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createContractualization } from "../../../services/Contractualizations";
import { useNavigate } from "react-router-dom";
import { format, addDays } from 'date-fns'

type ParamProps = {
  name: string;
  fi: number;
};

type MaintenanceTypeProps = {
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
    pf: number;
    ust: number;
    hh: number;
  };
  maintenanceTypes: Array<MaintenanceTypeProps>;
};

export function CreateContractualization() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceTypes, setMaintenanceTypes] = useState<
    Array<MaintenanceTypeProps>
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


  console.log(addDays(new Date(), 1))

  const schema = Yup.object().shape({
    name: Yup.string().required("Campo obrigatório"),
    effectiveDate: Yup.date().required("Campo obrigatório"),
    finishDate: Yup.date()
      .required("Campo obrigatório")
      .min(format(addDays(new Date(), 1), 'yyyy-MM-dd'), "A data de precisa ser maior do que a atual (hoje)"),
    predictedVolumeFunctionPoint: Yup.number().required("Campo obrigatório"),
    clientId: Yup.number().required("Campo obrigatório"),
    prices: Yup.object()
      .shape({
        pf: Yup.number()
          .required("Campo obrigatório")
          .moreThan(0, "Campo obrigatório"),
        ust: Yup.number()
          .required("Campo obrigatório")
          .moreThan(0, "Campo obrigatório"),
        hh: Yup.number()
          .required("Campo obrigatório")
          .moreThan(0, "Campo obrigatório"),
      })
      .required("Campo obrigatório"),
    maintenanceTypes: Yup.array(
      Yup.object().shape({
        name: Yup.string().required("Campo obrigatório"),
        params: Yup.array(
          Yup.object().shape({
            name: Yup.string().required("Campo obrigatório"),
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
    getValues
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      effectiveDate: format(new Date(), 'yyyy-MM-dd'),
      finishDate: format(new Date(), 'yyyy-MM-dd'),
      maintenanceTypes: [
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
      predictedVolumeFunctionPoint: undefined,
      prices: {
        pf: undefined,
        hh: undefined,
        ust: undefined,
      },
    },
  });

  function getParamMessageError(
    index: number,
    paramIndex: number,
    fieldName: string
  ) {
    const hasMaintenanceTypes =
      errors.maintenanceTypes && errors.maintenanceTypes[index];

    if (hasMaintenanceTypes?.params) {
      if (fieldName === "name")
        return hasMaintenanceTypes.params[paramIndex]?.name?.message;
      if (fieldName === "fi")
        return hasMaintenanceTypes.params[paramIndex]?.fi?.message;
    }

    return "";
  }

  const emptyMaintenanceType = {
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

  function addMaintenanceType() {
    setMaintenanceTypes([...maintenanceTypes, emptyMaintenanceType]);
  }

  function removeMaintenanceType(index: number) {
    const size = maintenanceTypes.length;

    if (size > 1) {
      maintenanceTypes.splice(index, 1);
      setMaintenanceTypes([...maintenanceTypes]);
    } else {
      showErrorToast({
        message:
          "Não é possível deixar uma contratualização sem um tipo de serviço",
      });
    }
  }

  function addParamToMaintenanceType(index: number) {
    maintenanceTypes[index].params.push(emptyParam);
    setMaintenanceTypes([...maintenanceTypes]);
  }

  function removeParamFromMaintenanceType(
    maintenanceTypeIndex: number,
    paramIndex: number
  ) {
    const size = maintenanceTypes[maintenanceTypeIndex].params.length;

    if (size > 1) {
      maintenanceTypes[maintenanceTypeIndex].params.splice(paramIndex, 1);
      setMaintenanceTypes([...maintenanceTypes]);
    } else {
      showErrorToast({
        message: "Não é possível deixar um tipo de serviço sem parâmetros",
      });
    }
  }

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
                      <option value="1">Criente</option>
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
                className={`form-control ${!!errors.prices?.ust?.message ? "is-invalid" : ""
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
          <Col md={6} lg={4}>
            <FormGroup floating>
              <NumberFormat
                className={`form-control ${!!errors.prices?.pf?.message ? "is-invalid" : ""}`}
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
                  setValue("prices.pf", +value);
                }}
              />
              <Label>Valor do ponto de função</Label>
              <FormFeedback>{errors.prices?.pf?.message}</FormFeedback>
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
                      className={`form-control ${!!errors.prices?.ust ? "is-invalid" : ""
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
                        setValue("prices.ust", +value);
                      }}
                    />
                  );
                }}
              />
              <Label>Valor Ust</Label>
              <FormFeedback>{errors.prices?.ust?.message}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6} lg={4}>
            <FormGroup floating>
              <NumberFormat
                className={`form-control ${!!errors.prices?.hh?.message ? "is-invalid" : ""
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
                  setValue("prices.hh", +value);
                }}
              />
              <Label>Valor homem hora</Label>
              <FormFeedback>{errors.prices?.hh?.message}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
      </div>

      {maintenanceTypes.map((e, index) => {
        return (
          <div className="app-bg p-4 mt-4" key={index}>
            <Row key={index}>
              <div className="d-flex gap-3 col-12">
                <small className="mb-3 text-truncate">
                  Tipo de serviço {index + 1}
                </small>
                <small
                  className="pointer text-primary-700 text-truncate"
                  title={`Clique para adicionar novo parâmetro ao tipo de parâmetro ${index + 1
                    }`}
                  onClick={() => addParamToMaintenanceType(index)}
                >
                  adicionar parâmetro
                </small>
                <div className="d-flex align-items-start">
                  <small
                    className="pointer text-red text-truncate"
                    title={`Clique para remover o tipo de parâmetro ${index + 1
                      }`}
                    onClick={() => removeMaintenanceType(index)}
                  >
                    remover
                  </small>
                </div>
              </div>
              <Col sm={12}>
                <FormGroup floating>
                  <Controller
                    control={control}
                    name={`maintenanceTypes.${index}.name`}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          invalid={
                            errors.maintenanceTypes &&
                            !!errors.maintenanceTypes[index]?.name
                          }
                          placeholder="Nome"
                          type="text"
                        />
                      );
                    }}
                  />
                  <Label>Nome</Label>
                  <FormFeedback>
                    {errors.maintenanceTypes &&
                      errors.maintenanceTypes[index]?.name?.message}
                  </FormFeedback>
                </FormGroup>
                <p>
                  {errors.maintenanceTypes &&
                    !!errors.maintenanceTypes[index]?.message}
                </p>
              </Col>
              {e.params.map((_p, paramIndex) => {
                return (
                  <Row key={paramIndex}>
                    <div className="d-flex justify-content-end">
                      <small
                        className="text-red text-end pointer mb-1"
                        title={`Clique para remover o parâmetro ${paramIndex + 1
                          } do tipo de serviço ${index + 1}`}
                        onClick={() =>
                          removeParamFromMaintenanceType(index, paramIndex)
                        }
                      >
                        remover
                      </small>
                    </div>
                    <Col md={6}>
                      <FormGroup floating>
                        <Controller
                          control={control}
                          name={`maintenanceTypes.${index}.params.${paramIndex}.name`}
                          render={({ field }) => {
                            return (
                              <Input
                                {...field}
                                className={
                                  !!getParamMessageError(
                                    index,
                                    paramIndex,
                                    "name"
                                  )
                                    ? "is-invalid"
                                    : ""
                                }
                                placeholder="Nome do parâmetro"
                                type="text"
                              />
                            );
                          }}
                        />
                        <Label>Nome do parâmetro</Label>
                        <FormFeedback>
                          {getParamMessageError(index, paramIndex, "name")}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup floating>
                        <NumberFormat
                          className={`form-control ${!!getParamMessageError(index, paramIndex, "fi")
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
                              `maintenanceTypes.${index}.params.${paramIndex}.fi`,
                              +value
                            );
                          }}
                        />
                        <Label>Valor de ajuste %</Label>
                        <FormFeedback>
                          {getParamMessageError(index, paramIndex, "fi")}
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
            {isLoading && <Spinner size='sm' className="me-2" />}
            {isLoading ? "Salvando contratualização..." : "Salvar contratualização"}
          </Button>
        </div>
        <small
          className="pointer text-primary-700"
          title="Clique para adicionar um novo tipo de serviço"
          onClick={addMaintenanceType}
        >
          Adicionar tipo de serviço
        </small>
      </Col>
    </Row>
  );
}
