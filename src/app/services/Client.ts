import { Api } from "../../config/Axios";
import { CreateAccountFormProps } from "../Modules/Auth/CreateAccount";
import { GetContractualizationsParams } from "./Contractualizations";

type SubscribeContractParams = {
  type: "NOT_SUBSCRIBE" | "SUBSCRIBE";
  clientId: number;
  companyId: number;
  contractId: number;
};

type UpdateParam = {
  clientId: string;
  companyId: string;
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

export async function rejectUpdate({ contractId, ...rest }: UpdateParam) {
  try {
    return Api.put(`/clients/reject-update/${contractId}`, rest);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function acceptUpdate({ contractId, ...rest }: UpdateParam) {
  try {
    return Api.put(`/clients/accept-update/${contractId}`, rest);
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

export async function createClientAccount(data: CreateAccountFormProps) {
  try {
    return Api.post(`/clients`, data);
  } catch (error) {
    return Promise.reject(error);
  }
}
