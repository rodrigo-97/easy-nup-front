import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@vechaiui/react";
import { Envelope } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginMain } from "./components/LoginMain";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../helpers/Toast";
import { useState } from "react";
import { forgotPassword } from "../../services/Auth";
import { parseApiError } from "../../../helpers/ParseApiError";

type FormProps = {
  email: string;
};

export function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string()
          .required("Campo obrigatório")
          .email("E-mail inválido"),
      })
    ),
  });

  async function onSubmit({ email }: FormProps) {
    setLoading(true);
    forgotPassword(email)
      .then(() => {
        showSuccessToast({ message: "E-mail de recuperação enviado" });
        navigate(-1);
      })
      .catch((error) =>
        showErrorToast({
          message: parseApiError(error),
        })
      )
      .finally(() => setLoading(false));
  }

  return (
    <LoginMain>
      <p className="text-2xl font-bold text-center mb-5">Recuperar senha</p>
      <FormControl invalid={!!errors.email}>
        <FormLabel>Nome</FormLabel>
        <Input.Group>
          <Input {...register("email")} placeholder="Endereço de e-mail" />
          <Input.LeftElement children={<Envelope size={20} />} />
        </Input.Group>
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <Button
        className="w-full mt-3"
        variant="solid"
        color="blue"
        loading={loading}
        loadingText="Enviando e-mail"
        onClick={handleSubmit(onSubmit)}
      >
        Enviar e-mail
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
