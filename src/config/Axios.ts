import axios, { AxiosError } from "axios";

const url = import.meta.env.VITE_API_URL as string

export const config = axios.create({ baseURL: url });

config.interceptors.request.use(
  function (config) {
    const token = `Bearer ${localStorage.getItem("APP_TOKEN")}` ?? "";
    config.headers!.Authorization = token;

    console.log(`${url}${config.url}`)

    return config;
  },
  function (error) {
    console.log(error)
    return Promise.reject(error);
  }
);

console.log(url)

config.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      localStorage.removeItem("APP_TOKEN");
    }
    return Promise.reject(error);
  }
);

export const Api = config;
