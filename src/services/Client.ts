import { Api } from "../config/Axios";
import { GetContractualizationsParams } from "./Contractualizations";

type SubscribeContractParams = {
  type: "NOT_SUBSCRIBE" | "SUBSCRIBE",
  clientId: number,
  companyId: number,
  contractId: number
}

export async function getClientContracts({ order, page, perPage, search, status }: GetContractualizationsParams) {

  try {
    return Api.get("/clients/contractualizations-to-subscribe", { params: { order, page, perPage, search, status } });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function subscribeContract(data: SubscribeContractParams) {
  try {
    return Api.post("/clients/subscribe", data);
  } catch (error) {
    return Promise.reject(error);
  }
}
