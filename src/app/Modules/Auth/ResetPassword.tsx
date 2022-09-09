import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@vechaiui/react";
import { Envelope } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../helpers/Toast";
import { resetPasword } from "../../../services/Auth";
import { LoginMain } from "./components/LoginMain";

export type ResetPasswordFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
};

export function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormProps>({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string()
          .required("Campo obrigatório")
          .email("E-mail inválido"),
      })
    ),
  });

  async function onSubmit(data: ResetPasswordFormProps) {
    setLoading(true);
    token &&
      resetPasword({ ...data, token })
        .then(() => {
          showSuccessToast({ message: "E-mail de recuperação enviado" });
          navigate(-1);
        })
        .catch(() =>
          showErrorToast({
            message: "Não foi possível enviar e-mail de recuperação",
          })
        )
        .finally(() => setLoading(false));
  }

  return (
    <LoginMain>
      <p className="text-2xl font-bold text-center mb-5">Recuperar senha</p>

      <div className="space-y-3">
        <FormControl invalid={!!errors.email}>
          <FormLabel>Nome</FormLabel>
          <Input.Group>
            <Input {...register("email")} placeholder="Endereço de e-mail" />
            <Input.LeftElement children={<Envelope size={20} />} />
          </Input.Group>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl invalid={!!errors.email}>
          <FormLabel>Senha</FormLabel>
          <Input.Group>
            <Input {...register("password")} placeholder="Senha" />
            <Input.LeftElement children={<Envelope size={20} />} />
          </Input.Group>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl invalid={!!errors.email}>
          <FormLabel>Confirmar senha</FormLabel>
          <Input.Group>
            <Input
              {...register("confirmPassword")}
              placeholder="Confirmar senha"
            />
            <Input.LeftElement children={<Envelope size={20} />} />
          </Input.Group>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
      </div>

      <Button
        className="w-full mt-3"
        variant="solid"
        color="blue"
        loading={loading}
        loadingText="Enviando e-mail"
        onClick={handleSubmit(onSubmit)}
      >
        Alterar senha
      </Button>

      <Button
        className="w-full mt-10"
        variant="link"
        color="blue"
        onClick={() => navigate(-1)}
      >
        Voltar
      </Button>
    </LoginMain>
  );
}
