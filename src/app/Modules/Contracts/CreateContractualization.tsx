import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select
} from "@vechaiui/react";
import { addDays, format } from "date-fns";
import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { ContractStatus } from "../../../enums/ContractStatus";
import { parseApiError } from "../../../helpers/ParseApiError";
import { showErrorToast, showSuccessToast } from "../../../helpers/Toast";
import { GoBack } from "../../Components/GoBackIcon";
import { TwContainer } from "../../Components/Tailwind/Container";
import { Client } from "../../Models/Client";
import { Contract } from "../../Models/Contract";
import { getClients } from "../../services/Company";
import {
  createContractualization,
  getContractualizationById,
  updateContractualization
} from "../../services/Contractualizations";
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
  contractNumber?: string;
  biddingNumber?: string;
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
  const [isUpdate, setIsUpdate] = useState(false);
  const [contract, setContract] = useState<Contract | null>();

  const { id } = useParams();

  useEffect(() => {
    if (id) setIsUpdate(true);
  }, []);

  useEffect(() => {
    id &&
      getContractualizationById(+id)
        .then(({ data }) => {
          setContract(data);
        })
        .catch((error) => {
          showErrorToast({ message: parseApiError(error) });
        });
  }, []);

  useEffect(() => {
    fillForm();
  }, [contract]);

  useEffect(() => {
    getClients()
      .then(({ data }) => setClients(data))
      .catch(() =>
        showErrorToast({
          message: "N??o foi poss??vel carregar os seus clientes",
        })
      );
  }, []);

  function increaseStep() {
    if (formStep < MAX_STEPS) {
      setFormStep((p) => p + 1);
    }
  }

  function decreaseStep() {
    if (formStep === 1) {
      return navigate(-1);
    }

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

  function handleInvalidForm() {
    showErrorToast({ message: "O formul??rio possui erros. Revise o formul??rio e tente novamente" })
  }

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Campo obrigat??rio")
      .min(3, "Precisa ter mais de 3 caracteres"),
    effectiveDate: Yup.date().required("Campo obrigat??rio"),
    finishDate: Yup.date()
      .required("Campo obrigat??rio")
      .min(
        format(addDays(new Date(), 1), "yyyy-MM-dd"),
        "A data de precisa ser maior do que a atual (hoje)"
      ),
    predictedVolumeFunctionPoint: Yup.number()
      .required("Campo obrigat??rio")
      .typeError("Campo obrigat??rio")
      .moreThan(0, "Valor inv??lido"),
    clientId: Yup.number()
      .required("Campo obrigat??rio")
      .typeError("Campo obrigat??rio"),
    prices: Yup.object()
      .shape({
        pf: Yup.number().moreThan(0, "Campo obrigat??rio"),
        ust: Yup.number().moreThan(0, "Campo obrigat??rio"),
        hh: Yup.number().moreThan(0, "Campo obrigat??rio"),
      })
      .test(
        "at least one key",
        "Pelo menos um dos valores deve ser informado (pf, ust, hh)",
        validatePrices
      ),
    biddingNumber: Yup.string().nullable().typeError("Campo obrigat??rio"),
    contractNumber: Yup.string().nullable().typeError("Campo obrigat??rio"),
    serviceTypes: Yup.array(
      Yup.object().shape({
        name: Yup.string()
          .required("Campo obrigat??rio")
          .typeError("Campo obrigat??rio")
          .min(3, "Precisa ter mais de 3 caracteres")
          .test(
            "each name differents",
            "N??o pode haver nome de servi??os iguais",
            validateIfEachNameInServiceTypeIsDifferent
          ),
        params: Yup.array(
          Yup.object().shape({
            name: Yup.string()
              .required("Campo obrigat??rio")
              .typeError("Campo obrigat??rio")
              .min(3, "Precisa ter mais de 3 caracteres")
              .test(
                "each name differents",
                "N??o pode haver nome de par??metros iguais dentro de um mesmo tipo de servi??o",
                validateIfEachNameInServiceTypeParamsIsDifferent
              ),
            fi: Yup.number()
              .required("Campo obrigat??rio")
              .moreThan(0, "Campo obrigat??rio"),
          })
        ),
      })
    ),
  });

  const {
    formState: { errors, isValid },
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

  function fillForm() {
    if (contract) {
      setValue("name", contract.name);
      setValue("clientId", contract.client.id);
      setValue("biddingNumber", contract.biddingNumber);
      setValue("contractNumber", contract.contractNumber);
      setValue(
        "effectiveDate",
        format(new Date(contract.effectiveDate), "yyyy-MM-dd")
      );
      setValue(
        "finishDate",
        format(new Date(contract.finishDate), "yyyy-MM-dd")
      );
      setValue(
        "predictedVolumeFunctionPoint",
        +contract.predictedVolumeFunctionPoint
      );
      setValue("prices.pf", +contract.prices[0].pf);
      setValue("prices.ust", +contract.prices[0].ust);
      setValue("prices.hh", +contract.prices[0].hh);

      setValue("serviceTypes", []); // para remover os pr?? definidos do cadastro

      contract.serviceTypes.map((sType) => {
        append(sType);
      });
    }
  }

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

    if (!isUpdate) {
      createContractualization(data)
        .then(() => {
          showSuccessToast({ message: "Contratualiza????o criada com sucesso" });
          navigate(-1);
        })
        .catch(() => {
          showErrorToast({
            message: "N??o foi poss??vel criar contratualiza????o",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      contract &&
        updateContractualization(data, +contract.id)
          .then(() => {
            const msg =
              contract.status === ContractStatus.PENDING
                ? "Contratualiza????o alterada com sucesso"
                : "Solicita????o de altera????o enviada para o cliente";
            showSuccessToast({ message: msg });
            navigate(-1);
          })
          .catch(() => {
            showErrorToast({
              message: "N??o foi poss??vel alterar contratualiza????o",
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
    }
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
      showSuccessToast({ message: "Tipo de servi??o removido" });
    } else {
      showErrorToast({
        message:
          "N??o ?? poss??vel deixar uma contratualiza????o sem um tipo de servi??o",
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
      showSuccessToast({ message: "Par??metro removido" });
    } else {
      showErrorToast({
        message: "N??o ?? poss??vel deixar um tipo de servi??o sem par??metros",
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
          <Select {...register("clientId")} disabled={isUpdate}>
            <option value="">Selecione um cliente</option>
            {clients.map((e, index) => {
              return (
                <option value={e.id} key={index}>
                  {e.user.name}
                </option>
              );
            })}
          </Select>
          <FormErrorMessage>{errors.clientId?.message}</FormErrorMessage>
        </FormControl>

        <FormControl className="mt-3" invalid={!!errors.contractNumber}>
          <FormLabel>N?? do contrato</FormLabel>
          <Input
            {...register("contractNumber")}
            placeholder="N??mero do contrato"
          />
          <FormErrorMessage>{errors.contractNumber?.message}</FormErrorMessage>
        </FormControl>

        <FormControl className="mt-3" invalid={!!errors.biddingNumber}>
          <FormLabel>N?? de licita????o</FormLabel>
          <Input
            {...register("biddingNumber")}
            placeholder="N??mero da licita????o"
          />
          <FormErrorMessage>{errors.biddingNumber?.message}</FormErrorMessage>
        </FormControl>

        <div className="grid grid-cols-2 gap-5 mt-3">
          <FormControl invalid={!!errors.effectiveDate}>
            <FormLabel>Data de efetiva????o</FormLabel>
            <Input
              {...register("effectiveDate")}
              placeholder="Data de efetiva????o"
              type="date"
            />
            <FormErrorMessage>{errors.effectiveDate?.message}</FormErrorMessage>
          </FormControl>

          <FormControl invalid={!!errors.finishDate}>
            <FormLabel>Data de finaliza????o</FormLabel>
            <Input
              {...register("finishDate")}
              placeholder="Data de efetiva????o"
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
          <FormLabel>Valor estimado de pontos de fun????o</FormLabel>
          <NumberFormat
            placeholder="Valor total de pontos de fun????o"
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
      <div className="space-y-5">
        {fields.map((e, index) => {
          return (
            <TwFormStepContainer key={index}>
              <small className="absolute bottom-0 -mt-5 right-2">
                servi??o {index + 1}
              </small>
              <TwFloatContainer>
                <Button
                  variant="solid"
                  color="red"
                  size="xs"
                  onClick={() => removeServiceType(fields.indexOf(e))}
                >
                  Deletar
                </Button>
                <Button
                  variant="solid"
                  color="blue"
                  size="xs"
                  onClick={() => {
                    addParamToServiceType(fields.indexOf(e));
                  }}
                >
                  <Plus />
                  Par??metro
                </Button>
              </TwFloatContainer>
              <div className="mb-3">
                <FormControl
                  invalid={
                    errors.serviceTypes && !!errors.serviceTypes[index]?.name
                  }
                  className="mb-10"
                >
                  <FormLabel>Nome do tipo de servi??o</FormLabel>
                  <Input
                    {...register(`serviceTypes.${index}.name`)}
                    placeholder="Nome do tipo de servi??o"
                  />
                  <FormErrorMessage>
                    {errors.serviceTypes &&
                      errors.serviceTypes[index]?.name?.message}
                  </FormErrorMessage>
                </FormControl>

                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {fields[index].params.map((_, pIndex) => {
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
                            thousandSeparator={""}
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
      <div className="mb-10">
        <GoBack text="Criar contratualiza????o" />
      </div>

      {formStep === 1 && formStepOne()}
      {formStep === 2 && formStepTwo()}
      {formStep === 3 && formStepThree()}

      <div
        className={`flex ${formStep !== MAX_STEPS ? "justify-end" : "justify-between"
          } items-end space-x-3`}
      >
        {formStep === MAX_STEPS && (
          <Button
            onClick={addServiceType}
            className="shadow-lg border-blue-200"
            color="blue"
            variant="light"
          >
            <Plus /> Servi??o
          </Button>
        )}
        <div className="space-x-2">
          <Button color="blue" onClick={decreaseStep} className="mt-10">
            Voltar
          </Button>
          {formStep === MAX_STEPS ? (
            <Button
              variant="solid"
              color="blue"
              onClick={handleSubmit(onSubmit, handleInvalidForm)}
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
              Pr??ximo
            </Button>
          )}
        </div>
      </div>
    </TwContainer >
  );
}
