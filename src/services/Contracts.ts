import { Api } from "../config/Axios"

export function getContracts (page:number){
    try {
        return Api.get('/contractualizations', {params:{page}})
    } catch (error) {
        return Promise.reject(error)
    }
}