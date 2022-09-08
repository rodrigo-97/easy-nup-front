import { FormProps as Contractualization } from "../app/Modules/Contractualizations/CreateContractualization";
import { Api } from "../config/Axios";

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
