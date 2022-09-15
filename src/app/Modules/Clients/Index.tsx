import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { GoBack } from "../../Components/GoBackIcon";
import { TwContainer } from "../../Components/Tailwind/Container";
import * as Yup from 'yup'
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@vechaiui/react";
import { addClient, getClients } from "../../services/Company";
import { showErrorToast, showSuccessToast } from "../../../helpers/Toast";
import { parseApiError } from "../../../helpers/ParseApiError";
import { useEffect, useState } from "react";
import { Client } from "../../Models/Client";

export function Clients() {
  const [loading, setLoading] = useState(false)
  const [clients, setClients] = useState<Array<Client>>()

  const { register, formState: { errors }, handleSubmit } = useForm<{ email: string }>({
    resolver: yupResolver(Yup.object().shape({
      email: Yup
        .string()
        .required("Campo obrigatório")
        .email("E-mail inválido")
    }))
  })

  function onSubmit({ email }: { email: string }) {
    setLoading(true)
    addClient(email)
      .then(() => {
        showSuccessToast({ message: "Um e-mail foi enviado para o cliente. Assim que ele aceitar o convite o mesmo irá apareceer na listagem de clientes" })
      })
      .catch((error) => {
        showErrorToast({ message: parseApiError(error) })
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getClients()
      .then(({ data }) => {
        setClients(data)
      })
  }, [])

  return (
    <>
      <GoBack text="Clientes" />
      <TwContainer className="bg-white rounded-lg dark:bg-gray-700 mt-10 p-4">
        <FormControl invalid={!!errors.email}>
          <FormLabel>E-mail</FormLabel>
          <Input
            {...register("email")}
            placeholder="E-mail do cliente"
            type="email"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <div className="flex justify-end">
          <Button
            variant="solid"
            color="blue"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
            loadingText="Enviando convite"
          >
            Adicionar
          </Button>
        </div>

        <div className="mt-5">
          {
            clients?.map((e) => {
              return (
                <div className="mb-3 p-3 border-green-400 bg-green-200 border-l-4 border-l-green-400 dark:bg-opacity-15">
                  <small>Nome</small>
                  <p className="mb-3">{e.user.name}</p>
                  <small>Email</small>
                  <p>{e.user.email}</p>
                </div>
              )
            })
          }
        </div>
      </TwContainer>
    </>
  )
}
