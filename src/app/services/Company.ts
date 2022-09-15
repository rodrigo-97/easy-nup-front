import { Api } from "../../config/Axios";
import { CreateAccountFormProps } from "../Modules/Auth/CreateAccount";

export async function getClients() {
  try {
    return Api.get("/companies");
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getContractualizationsCount() {
  try {
    return Api.get("/contractualizations/count");
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createCompanyAccount(data: CreateAccountFormProps) {
  try {
    return Api.post("/companies", data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function addClient(email: string) {
  try {
    return Api.post("/companies/add-client", { email });
  } catch (error) {
    return Promise.reject(error);
  }
}
