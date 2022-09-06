import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import bottom from "../../../assets/bg.svg";
import { AppPages } from "../../../config/AppPages";
import { useAuth } from "../../../contexts/AuthContext";
import { useTheme } from "../../../contexts/ThemeContext";
import { showErrorToast } from "../../../helpers/Toast";
import { login } from "../../../services/Auth";
import { Button } from "@material-tailwind/react";

export type LoginProps = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { setIsAuthenticated } = useAuth();

  const schema = Yup.object().shape({
    email: Yup.string().required("Campo obrigatório").email("E-mail inválido"),
    password: Yup.string().required("Campo obrigatório"),
  });

  const {
    control,
    handleSubmit,
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

  async function handleLogin({ email, password }: LoginProps) {
    login({ email, password })
      .then(({ data: { token } }) => {
        localStorage.setItem("APP_TOKEN", token);
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        showErrorToast({ message: error });
      });
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center login-bg"
      style={{ height: "100vh" }}
    >
      {theme === "light" && (
        <img
          src={bottom}
          className="position-absolute bottom-0"
          style={{ zIndex: 10, width: "100%" }}
        />
      )}
      <div className="d-sm-block d-md-flex justify-content-between position-absolute top-0 w-100 px-3 px-sm-2 px-md-5 py-3">
        EasyNup
        <div className="d-flex justify-content-between gap-3 align-items-center">
          Não possui uma conta?
          <button color="secondary" className="shadow">
            Criar conta
          </button>
        </div>
      </div>
      <div className="login-container app-bg border-gray-400 shadow bg-white rounded p-4 mx-3">
        <p className="h2 text-center mb-4">Login</p>
        <div>
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return <input {...field} placeholder="Senha" type="email" />;
            }}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="password"
            render={({ field }) => {
              return <input {...field} placeholder="Senha" type="password" />;
            }}
          />
          <p className="link text-primary-700 text-end mt-2">
            Esqueci minha senha?
          </p>
        </div>

        <div className="d-grid">
          <Button className="text-white" onClick={handleSubmit(handleLogin)}>
            Entrar
          </Button>
        </div>

        <hr className="mx-4" />

        <div className="d-block">
          <button
            className="border-gray-100 text-gray-700 w-100 social-button"

            // onClick={handleGoogleLogin}
          >
            <FcGoogle size={23} className="me-2" />
            Entrar com Google
          </button>
          <Button
            className="border-gray-100 text-gray-700 font-size-sm w-100 mt-3 social-button"
            // onClick={handleFacebookLogin}
          >
            <FaFacebook color="#4267B2" size={22} className="me-2" />
            Entrar com Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}
