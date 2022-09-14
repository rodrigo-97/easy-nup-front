import { Api } from "../../config/Axios";
import { LoginProps } from "../Modules/Auth/Login";
import { ResetPasswordFormProps } from "../Modules/Auth/ResetPassword";


export async function login({ email, password }: LoginProps) {
  try {
    return Api.post("/login", {
      email,
      password,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function forgotPassword(email: string) {
  try {
    return Api.post("/forgot-password", {
      email,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function resetPasword(data: ResetPasswordFormProps) {
  try {
    return Api.post("/reset-password", data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function me() {
  try {
    return Api.get("/me");
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logout() {
  try {
    return Api.post("/logout");
  } catch (error) {
    return Promise.reject(error);
  }
}
