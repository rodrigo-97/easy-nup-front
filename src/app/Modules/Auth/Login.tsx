import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@vechaiui/react";
import { Envelope, Eye, EyeClosed, Key } from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../../contexts/AuthContext";
import { showErrorToast } from "../../../helpers/Toast";
import { login } from "../../services/Auth";
import { LoginMain } from "./components/LoginMain";

export type LoginProps = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().required("Campo obrigatório").email("E-mail inválido"),
    password: Yup.string().required("Campo obrigatório"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  function handleGoogleLogin() {
    window.location.href = "http://localhost:3333/google/redirect";
  }

  function handleFacebookLogin() {
    window.location.href = "http://localhost:3333/facebook/redirect";
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleRedirectToForgotPassword() {
    navigate("forgot-password");
  }

  function handleRedirectToCreateAccount() {
    navigate("create-account");
  }

  async function onSubmit({ email, password }: LoginProps) {
    setLoading(true);
    login({ email, password })
      .then(({ data: { token } }) => {
        localStorage.setItem("APP_TOKEN", token);
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((error) => {
        showErrorToast({ message: error?.response?.data.error });
      })
      .finally(() => setLoading(false));
  }

  return (
    <LoginMain>
      <p className="text-2xl font-bold text-center mb-5">Login</p>

      <FormControl invalid={!!errors.email}>
        <FormLabel>E-mail</FormLabel>
        <Input.Group>
          <Input {...register("email")} placeholder="Endereço de e-mail" />
          <Input.LeftElement children={<Envelope size={20} />} />
        </Input.Group>
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      <FormControl invalid={!!errors.email} className="mt-3">
        <FormLabel>Senha</FormLabel>
        <Input.Group>
          <Input
            {...register("password")}
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
          />
          <Input.LeftElement children={<Key size={20} />} />
          <Input.RightElement
            onClick={toggleShowPassword}
            children={
              <>
                {showPassword ? (
                  <Eye size={20} className="cursor-pointer" />
                ) : (
                  <EyeClosed size={20} className="cursor-pointer" />
                )}
              </>
            }
          />
        </Input.Group>
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <div className="flex justify-end mb-5">
        <Button
          variant="link"
          color="blue"
          onClick={handleRedirectToForgotPassword}
        >
          Esqueci minha senha?
        </Button>
      </div>

      <Button
        variant="solid"
        color="blue"
        className="w-full mt-3"
        onClick={handleSubmit(onSubmit)}
        loading={loading}
        loadingText="Entrando"
      >
        Entrar
      </Button>

      <Button
        variant="link"
        color="blue"
        className="mt-5 w-full text-center"
        onClick={handleRedirectToCreateAccount}
      >
        Criar conta
      </Button>
    </LoginMain>
  );
}
