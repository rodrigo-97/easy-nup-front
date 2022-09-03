import { Client } from "./Client"
import { Contract } from "./Contract"

export type Company = {
    id: number
    socialCode: string
    socialName: string
    userId: number
    createdAt: Date
    updatedAt: Date
    user: any
    contracts: Array<Contract>
    clients: Array<Client>
}