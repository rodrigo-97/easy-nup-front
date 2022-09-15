import { AxiosError } from "axios";

type ApiErrors = {
  error?: string;
  errors: Array<{ field: string; message: string; rule: string }>;
};

export function parseApiError(error: AxiosError<ApiErrors>) {
  const isArray = Array.isArray(error.response?.data.errors);

  if (isArray) {
    return error.response?.data.errors[0].message ?? "Erro";
  }

  return error.response?.data.error ?? "Erro";
}
