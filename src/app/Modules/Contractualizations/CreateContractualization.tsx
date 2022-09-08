import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@vechaiui/react";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../helpers/Toast";
import { getClients } from "../../../services/Company";
import { createContractualization } from "../../../services/Contractualizations";
import { GoBack } from "../../Components/GoBackIcon";
import { TwContainer } from "../../Components/Tailwind/Container";
import { Client } from "../../Models/Client";
import { TwFloatButton } from "./Components/FloatButton";
import { TwFloatContainer } from "./Components/FloatContainer";
import { TwFormStepContainer } from "./Components/FormStepContainer";
import { TwParamBlock } from "./Components/ParamBlock";

type ParamProps = {
  name: string | undefined | null;
  fi: number | undefined;
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
  const MAX_STEPS = 3;
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState<Array<Client>>([]);

  useEffect(() => {
    getClients()
      .then(({ data }) => setClients(data))
      .catch(() =>
        showErrorToast({
          message: "Não foi possível carregar os seus clientes",
        })
      );
  }, []);

  function increaseStep() {
    if (formStep < MAX_STEPS) {
      setFormStep((p) => p + 1);
    }
  }

  function decreaseStep() {
    if (formStep > 1) {
      setFormStep((p) => p - 1);
    }
  }

  function validatePrices(val: any) {
    const { pf, hh, ust } = val;

    if (!pf && !hh && !ust) {
      return false;
    }

    return true;
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
    predictedVolumeFunctionPoint: Yup.number()
      .required("Campo obrigatório")
      .typeError("Campo obrigatório")
      .moreThan(0, "Valor inválido"),
    clientId: Yup.number()
      .required("Campo obrigatório")
      .typeError("Campo obrigatório"),
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
    formState: { errors },
    handleSubmit,
    setValue,
    register,
    getValues,
    control,
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      effectiveDate: format(new Date(), "yyyy-MM-dd"),
      finishDate: format(new Date(), "yyyy-MM-dd"),
      serviceTypes: [
        {
          name: "",
          params: [
            {
              fi: undefined,
              name: null,
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

  function validateIfEachNameInServiceTypeIsDifferent(val: any): boolean {
    const nameIsInserviceTypes: boolean =
      getValues().serviceTypes.filter((e) => e.name === val).length >= 2;

    return !nameIsInserviceTypes;
  }

  function validateIfEachNameInServiceTypeParamsIsDifferent(val: any): boolean {
    const filteredParams = getValues().serviceTypes.map((e) => e.params);
    const [hasMoreThanOneSameName] = filteredParams.filter(
      (e) => e.filter((j) => j.name === val).length >= 2
    );

    return !!!hasMoreThanOneSameName as boolean;
  }

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "serviceTypes",
  });

  function getParamMessageError(
    i: number,
    paramIndex: number,
    fieldName: string
  ) {
    const hasserviceTypes = errors.serviceTypes && errors.serviceTypes[i];

    if (hasserviceTypes?.params) {
      if (fieldName === "name")
        return hasserviceTypes.params[paramIndex]?.name?.message;
      if (fieldName === "fi")
        return hasserviceTypes.params[paramIndex]?.fi?.message;
    }

    return "";
  }

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
    append({
      name: "",
      params: [
        {
          fi: undefined,
          name: "",
        },
      ],
    });
  }

  function removeServiceType(i: number) {
    const size = fields.length;

    if (size > 1) {
      remove(i);
      showSuccessToast({ message: "Tipo de serviço removido" });
    } else {
      showErrorToast({
        message:
          "Não é possível deixar uma contratualização sem um tipo de serviço",
      });
    }
  }

  function addParamToServiceType(i: number) {
    const params = fields[i].params;
    const serviceName = getValues().serviceTypes[i].name;

    // Para resolver um bug do react hook forms causado no primeiro indice
    if (params.length === 1) {
      params[0].fi = getValues().serviceTypes[i].params[0].fi;
      params[0].name = getValues().serviceTypes[i].params[0].name;
    }

    update(i, {
      name: serviceName,
      params: [...params, { fi: undefined, name: undefined }],
    });
  }

  function removeParamFromServiceType(
    serviceTypeindex: number,
    paramIndex: number
  ) {
    const size = fields[serviceTypeindex].params.length;
    if (size > 1) {
      fields[serviceTypeindex].params.splice(paramIndex, 1);
      update(serviceTypeindex, {
        name: fields[serviceTypeindex].name,
        params: fields[serviceTypeindex].params,
      });
      showSuccessToast({ message: "Parâmetro removido" });
    } else {
      showErrorToast({
        message: "Não é possível deixar um tipo de serviço sem parâmetros",
      });
    }
  }

  function formStepOne() {
    return (
      <TwFormStepContainer>
        <FormControl invalid={!!errors.name} className="col-span-2">
          <FormLabel>Nome</FormLabel>
          <Input {...register("name")} placeholder="Nome do contrato" />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl className="mt-3" invalid={!!errors.clientId}>
          <FormLabel>Cliente</FormLabel>
          <Select {...register("clientId")}>
            <option value="">Selecione um cliente</option>
            {clients.map((e) => {
              return (
                <option value={e.id} key={e.id}>
                  {e.user.name}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>{errors.clientId?.message}</FormErrorMessage>
        </FormControl>

        <div className="grid grid-cols-2 gap-5 mt-3">
          <FormControl invalid={!!errors.effectiveDate}>
            <FormLabel>Data de efetivação</FormLabel>
            <Input
              {...register("effectiveDate")}
              placeholder="Data de efetivação"
              type="date"
            />
            <FormErrorMessage>{errors.effectiveDate?.message}</FormErrorMessage>
          </FormControl>

          <FormControl invalid={!!errors.finishDate}>
            <FormLabel>Data de finalização</FormLabel>
            <Input
              {...register("finishDate")}
              placeholder="Data de efetivação"
              type="date"
            />
            <FormErrorMessage>{errors.finishDate?.message}</FormErrorMessage>
          </FormControl>
        </div>
      </TwFormStepContainer>
    );
  }

  function formStepTwo() {
    return (
      <TwFormStepContainer>
        <FormControl invalid={!!errors.predictedVolumeFunctionPoint}>
          <FormLabel>Valor estimado de pontos de função</FormLabel>
          <NumberFormat
            placeholder="Valor total de pontos de função"
            decimalSeparator=","
            thousandSeparator="."
            decimalScale={2}
            allowNegative={false}
            customInput={Input}
            value={getValues().predictedVolumeFunctionPoint}
            onValueChange={({ floatValue }) => {
              if (floatValue)
                setValue("predictedVolumeFunctionPoint", floatValue);
            }}
            isAllowed={({ floatValue }) => {
              if (floatValue && floatValue >= 99999999) {
                return false;
              }
              return true;
            }}
          />
          <FormErrorMessage>
            {errors.predictedVolumeFunctionPoint?.message}
          </FormErrorMessage>
        </FormControl>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-3 mt-3">
          <FormControl invalid={!!errors.prices?.pf || !!errors.prices}>
            <FormLabel>Valor pf</FormLabel>
            <NumberFormat
              placeholder="Valor pf"
              decimalSeparator=","
              thousandSeparator="."
              decimalScale={2}
              allowNegative={false}
              customInput={Input}
              value={getValues().prices.pf}
              prefix="R$ "
              onValueChange={({ floatValue }) => {
                setValue("prices.pf", floatValue);
              }}
              isAllowed={({ floatValue }) => {
                if (floatValue && floatValue >= 99999999) {
                  return false;
                }
                return true;
              }}
            />
            <FormErrorMessage>
              {errors.prices?.pf?.message || errors.prices?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl invalid={!!errors.prices?.ust || !!errors.prices}>
            <FormLabel>Valor ust</FormLabel>
            <NumberFormat
              placeholder="Valor ust"
              decimalSeparator=","
              thousandSeparator="."
              decimalScale={2}
              allowNegative={false}
              customInput={Input}
              value={getValues().prices.ust}
              prefix="R$ "
              onValueChange={({ floatValue }) => {
                setValue("prices.ust", floatValue);
              }}
              isAllowed={({ floatValue }) => {
                if (floatValue && floatValue >= 99999999) {
                  return false;
                }
                return true;
              }}
            />
            <FormErrorMessage>
              {errors.prices?.ust?.message || errors.prices?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl invalid={!!errors.prices?.hh || !!errors.prices}>
            <FormLabel>Valor hh</FormLabel>
            <NumberFormat
              placeholder="Valor hh"
              decimalSeparator=","
              thousandSeparator="."
              decimalScale={2}
              allowNegative={false}
              customInput={Input}
              value={getValues().prices.hh}
              prefix="R$ "
              onValueChange={({ floatValue }) => {
                setValue("prices.hh", floatValue);
              }}
              isAllowed={({ floatValue }) => {
                if (floatValue && floatValue >= 99999999) {
                  return false;
                }
                return true;
              }}
            />
            <FormErrorMessage>
              {errors.prices?.hh?.message || errors.prices?.message}
            </FormErrorMessage>
          </FormControl>
        </div>
      </TwFormStepContainer>
    );
  }

  function formStepThree() {
    return (
      <div className="space-y-20">
        {fields.map((e, index) => {
          return (
            <TwFormStepContainer key={e.id} class>
              <TwFloatContainer>
                <p className="text-sm">Tipo de serviço {index + 1}</p>
                <div className="space-x-3">
                  <Button
                    color="red"
                    variant="light"
                    className="shadow-lg border-red-200"
                    onClick={() => removeServiceType(fields.indexOf(e))}
                  >
                    Excluir
                  </Button>
                  <Button
                    variant="light"
                    color="blue"
                    className="shadow-lg border-blue-200"
                    onClick={() => {
                      addParamToServiceType(fields.indexOf(e));
                    }}
                  >
                    Adicionar parâmetro
                  </Button>
                </div>
              </TwFloatContainer>
              <div className="mb-3">
                <FormControl
                  invalid={
                    errors.serviceTypes && !!errors.serviceTypes[index]?.name
                  }
                  className="mb-10"
                >
                  <FormLabel>Nome do tipo de serviço</FormLabel>
                  <Input
                    {...register(`serviceTypes.${index}.name`)}
                    placeholder="Nome do tipo de serviço"
                  />
                  <FormErrorMessage>
                    {errors.serviceTypes &&
                      errors.serviceTypes[index]?.name?.message}
                  </FormErrorMessage>
                </FormControl>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {fields[index].params.map((_, pIndex) => {
                    console.log(_);
                    return (
                      <TwParamBlock key={pIndex}>
                        <TwFloatButton
                          onClick={() =>
                            removeParamFromServiceType(index, pIndex)
                          }
                          data-color="red"
                        >
                          x
                        </TwFloatButton>
                        <FormControl
                          invalid={
                            !!getParamMessageError(index, pIndex, "name")
                          }
                          className="mb-3"
                        >
                          <FormLabel>Nome {pIndex + 1}</FormLabel>
                          <Input
                            {...register(
                              `serviceTypes.${index}.params.${pIndex}.name`
                            )}
                            placeholder="Nome"
                          />
                          {!!getParamMessageError(index, pIndex, "name") && (
                            <FormErrorMessage>
                              {getParamMessageError(index, pIndex, "name")}
                            </FormErrorMessage>
                          )}
                        </FormControl>

                        <FormControl
                          invalid={!!getParamMessageError(index, pIndex, "fi")}
                          className=""
                        >
                          <FormLabel>Valor fi {pIndex + 1}</FormLabel>
                          <NumberFormat
                            placeholder="fi"
                            decimalSeparator=","
                            decimalScale={2}
                            thousandSeparator={''}
                            allowNegative={false}
                            customInput={Input}
                            value={
                              getValues().serviceTypes[index]?.params[pIndex].fi
                            }
                            suffix=" %"
                            onValueChange={({ floatValue }) => {
                              if (floatValue)
                                setValue(
                                  `serviceTypes.${index}.params.${pIndex}.fi`,
                                  floatValue
                                );
                            }}
                            isAllowed={({ floatValue }) => {
                              if (floatValue && floatValue > 100) {
                                return false;
                              }
                              return true;
                            }}
                          />
                          <FormErrorMessage>
                            {getParamMessageError(index, pIndex, "fi")}
                          </FormErrorMessage>
                        </FormControl>
                      </TwParamBlock>
                    );
                  })}
                </div>
              </div>
            </TwFormStepContainer>
          );
        })}
      </div>
    );
  }

  return (
    <TwContainer>
      {formStep === MAX_STEPS && (
        <div className="absolute bottom-0 left-0">
          <Button
            onClick={addServiceType}
            className="shadow-lg border-blue-200"
            color="blue"
            variant="light"
          >
            Adicionar tipo de serviço
          </Button>
        </div>
      )}
      <div className="mb-10">
        <GoBack text="Criar contratualização" />
      </div>

      {formStep === 1 && formStepOne()}
      {formStep === 2 && formStepTwo()}
      {formStep === 3 && <div className="mt-20">{formStepThree()}</div>}

      <div className="flex justify-end space-x-3">
        <Button color="blue" onClick={decreaseStep} className="mt-10">
          Voltar
        </Button>
        {formStep === MAX_STEPS ? (
          <Button
            variant="solid"
            color="blue"
            onClick={handleSubmit(onSubmit)}
            className="mt-10"
            loading={isLoading}
            loadingText="Salvando"
          >
            Enviar
          </Button>
        ) : (
          <Button
            variant="solid"
            color="blue"
            onClick={increaseStep}
            className="mt-10"
          >
            Próximo
          </Button>
        )}
      </div>
    </TwContainer>
  );
}
