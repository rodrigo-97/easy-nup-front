import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@vechaiui/react";
import {
  Buildings,
  Envelope,
  Eye,
  EyeClosed,
  IdentificationCard,
  Key,
  TextAa,
} from "phosphor-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createClientAccount } from "../../services/Client";
import { createCompanyAccount } from "../../services/Company";
import { LoginMain } from "./components/LoginMain";

export type CreateAccountFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  socialCode: string;
  socialName: string;
};

export function CreateAccount() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [formType, setFormType] = useState<"client" | "company">("company");

  const schema = Yup.object().shape({
    email: Yup.string().required("Campo obrigatório").email("E-mail inválido"),
    password: Yup.string().required("Campo obrigatório"),
    confirmPassword: Yup.string().required("Campo obrigatório"),
    name: Yup.string().required("Campo obrigatório"),
    socialCode: Yup.string().required("Campo obrigatório"),
    socialName: Yup.string().required("Campo obrigatório"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateAccountFormProps>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function toggleShowConfirmPassword() {
    setConfirmShowPassword(!showConfirmPassword);
  }

  function handleGoBack() {
    navigate(-1);
  }

  async function onSubmit(data: CreateAccountFormProps) {
    data.socialCode = data.socialCode.replace(/[^\w ]/g, "");
    if (formType === "client") {
      createClientAccount(data);
    } else {
      createCompanyAccount(data);
    }
  }

  return (
    <LoginMain className="mt-20">
      <p className="text-2xl font-bold text-center mb-5">Login</p>

      <FormControl className="mb-3">
        <FormLabel>Tipo de conta</FormLabel>
        <Select
          onChange={(e) => {
            setFormType(e.target.value as any);
          }}
        >
          <option value="company">Empresa</option>
          <option value="client">Cliente</option>
        </Select>
      </FormControl>

      <FormControl invalid={!!errors.name}>
        <FormLabel>Nome</FormLabel>
        <Input.Group>
          <Input {...register("name")} placeholder="Nome" />
          <Input.LeftElement children={<TextAa size={20} />} />
        </Input.Group>
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>

      <FormControl invalid={!!errors.email} className="mt-3">
        <FormLabel>Email</FormLabel>
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

      <FormControl invalid={!!errors.confirmPassword} className="mt-3">
        <FormLabel>Confirmar senha</FormLabel>
        <Input.Group>
          <Input
            {...register("confirmPassword")}
            placeholder="Confirmar senha"
            type={showConfirmPassword ? "text" : "password"}
          />
          <Input.LeftElement children={<Key size={20} />} />
          <Input.RightElement
            onClick={toggleShowConfirmPassword}
            children={
              <>
                {showConfirmPassword ? (
                  <Eye size={20} className="cursor-pointer" />
                ) : (
                  <EyeClosed size={20} className="cursor-pointer" />
                )}
              </>
            }
          />
        </Input.Group>
        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>

      {formType === "company" && (
        <>
          <FormControl invalid={!!errors.socialCode} className="mt-3">
            <FormLabel>CNPJ</FormLabel>
            <Input.Group>
              <Input
                {...register("socialCode")}
                placeholder="CNPJ"
                type="text"
              />
              <Input.LeftElement children={<IdentificationCard size={20} />} />
            </Input.Group>
            <FormErrorMessage>{errors.socialCode?.message}</FormErrorMessage>
          </FormControl>

          <FormControl invalid={!!errors.socialName} className="mt-3">
            <FormLabel>Razão social</FormLabel>
            <Input.Group>
              <Input
                {...register("socialName")}
                placeholder="Razão social"
                type="text"
              />
              <Input.LeftElement children={<Buildings size={20} />} />
            </Input.Group>
            <FormErrorMessage>{errors.socialName?.message}</FormErrorMessage>
          </FormControl>
        </>
      )}

      <Button
        variant="solid"
        color="blue"
        className="w-full mt-3"
        onClick={handleSubmit(onSubmit)}
      >
        Cadastrar
      </Button>

      <Button
        variant="link"
        color="blue"
        className="mt-5 w-full text-center"
        onClick={handleGoBack}
      >
        Voltar
      </Button>
    </LoginMain>
  );
}
