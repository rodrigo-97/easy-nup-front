import { Api } from "../../config/Axios";
import { GetContractualizationsParams } from "./Contractualizations";

type SubscribeContractParams = {
  type: "NOT_SUBSCRIBE" | "SUBSCRIBE";
  clientId: number;
  companyId: number;
  contractId: number;
};

type UpdateParam = {
  clientId: number;
  companyId: number;
  contractId: number;
};

export async function getClientContracts({
  order,
  page,
  perPage,
  search,
  status,
}: GetContractualizationsParams) {
  try {
    return Api.get("/clients/contractualizations-to-subscribe", {
      params: { order, page, perPage, search, status },
    });
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

export async function rejectUpdate(data: UpdateParam) {
  try {
    return Api.put(`/clients/reject-update/${data.contractId}`, data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function acceptUpdate(data: UpdateParam) {
  try {
    return Api.put(`/clients/accept-update/${data.contractId}`, data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function acceptDelete(id: number) {
  try {
    return Api.delete(`/clients/accept-delete/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function rejectDelete(id: number) {
  try {
    return Api.delete(`/clients/reject-delete/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
}
