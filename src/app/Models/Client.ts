import { Contract } from "./Contract"
import { User } from "./User"

export type Client = {
    id: number
    userId: number
    companyId?: number
    createdAt: Date
    updatedAt: Date
    company: any // TODO: fazer model
    contracts: Array<Contract>
    companyContract: any // TODO: Fazer model
    user: User
}