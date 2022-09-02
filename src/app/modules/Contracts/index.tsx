import { useEffect, useState } from "react"
import { ContractTile } from "../../components/ContractTile"
import { getContracts } from "../../../services/Contracts"

export function Contracts() {
    const [contracts, setContracts] = useState<Array<any>>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        findContracts()
    }, [])

    async function findContracts() {
        getContracts(page).then(({ data }) => {
            setContracts([...contracts, ...data.data])
        })
    }

    console.log(contracts)

    return (
        <div>
            <div className="d-flex gap-3 mb-4">
                <p className="h2">Contratualizações</p>
            </div>

            {
                contracts.map((e) => {
                    return (
                        <ContractTile contractualization={e} />
                    )
                })
            }

            <p
                className="pointer text-primary-700"
                onClick={() => {
                    setPage(p => p + 5)
                    findContracts()
                }}
            >
                Mostrar mais 5
            </p>
        </div>
    )
}