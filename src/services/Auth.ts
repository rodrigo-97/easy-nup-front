import { Api } from "../config/Axios";
import { LoginProps } from "../modules/Auth/Login";

export async function login ({email, password}:LoginProps){
    try {
        return Api.post("/login", { email, password })
    } catch (error) {
        return Promise.reject(error)
    }
}