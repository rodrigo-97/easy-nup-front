import { FormProps as Contractualization} from "../app/modules/Contracts/CreateContract"
import { Api } from "../config/Axios"

export function getContractualizations (page:number){
    try {
        return Api.get('/contractualizations', {params:{page}})
    } catch (error) {
        return Promise.reject(error)
    }
}

export function getContractualizationById (id:number){
    try {
        return Api.get(`/contractualizations/${id}`)
    } catch (error) {
        return Promise.reject(error)
    }
}

export function createContractualization (data: Contractualization){
    try {
        return Api.post('/contractualizations', data)
    } catch (error) {
        return Promise.reject(error)
    }
}