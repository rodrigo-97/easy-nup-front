import { FormProps as Contractualization} from "../app/modules/Contractualizations/CreateContractualization"
import { Api } from "../config/Axios"

export async function getContractualizations (page:number){
    try {
        return Api.get('/contractualizations', {params:{page}})
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getContractualizationById (id:number){
    try {
        return Api.get(`/contractualizations/${id}`)
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function createContractualization (data: Contractualization){
    try {
        return Api.post('/contractualizations', data)
    } catch (error) {
        return Promise.reject(error)
    }
}