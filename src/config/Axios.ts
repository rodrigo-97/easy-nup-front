import axios from "axios";

export const config = axios.create({ baseURL: "http://localhost:3333/api" })

config.interceptors.request.use(function (config) {
    const token = `Bearer ${localStorage.getItem("APP_TOKEN")}` ?? ''
    config.headers!.Authorization = token

    return config;
}, function (error) {
    return Promise.reject(error);
});


export const Api = config