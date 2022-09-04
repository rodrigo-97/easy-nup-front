import { Api } from "../config/Axios";

export async function getClients() {
  try {
    return Api.get("/companies");
  } catch (error) {
    return Promise.reject(error);
  }
}