import { Api } from "../../config/Axios";
import { FormProps as Contractualization } from "../Modules/Contractualizations/CreateContractualization";

export type GetContractualizationsParams = {
  page?: number;
  perPage?: number;
  search?: string;
  order?: "asc" | "desc";
  status?: string;
};

export async function getContractualizations({
  search,
  order,
  page,
  perPage,
  status,
}: GetContractualizationsParams) {
  try {
    return Api.get("/contractualizations", {
      params: { page, perPage, search, order, status },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getContractualizationById(id: number) {
  try {
    return Api.get(`/contractualizations/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function createContractualization(data: Contractualization) {
  try {
    return Api.post("/contractualizations", data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateContractualization(data: Contractualization, id: number) {
  try {
    return Api.put(`/contractualizations/${id}`, data);
  } catch (error) {
    return Promise.reject(error);
  }
}


export async function deleteContrac(id: number) {
  try {
    return Api.delete(`/contractualizations/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
}
