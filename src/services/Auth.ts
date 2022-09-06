import { Api } from "../config/Axios";
import { LoginProps } from "../app/Modules/Auth/Login";

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
