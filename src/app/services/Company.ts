import { Api } from "../../config/Axios";

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
