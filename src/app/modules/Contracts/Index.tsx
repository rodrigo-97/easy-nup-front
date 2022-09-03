import { useEffect, useState } from "react"
import { ContractTile } from "../../components/ContractTile"
import { getContractualizations } from "../../../services/Contractualizations"
import { Contractualization } from "../../Models/Contractualization"
import { Button, Col, Row, Spinner } from "reactstrap"
import { showErrorToast } from "../../../helpers/Toast"
import { MdAdd } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { Loading } from "../../components/Loading"

export function Contracts() {
    const [contracts, setContracts] = useState<Array<Contractualization>>([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        findContracts()
    }, [])

    async function findContracts() {
        setIsLoading(true)
        getContractualizations(page)
            .then(({ data }) => {
                setContracts([...contracts, ...data.data])
            })
            .catch((_error) => {
                showErrorToast({ message: "Não foi possível carregar suas contratualizações" })
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function handleRedirectToViewContractualization(id: number) {
        navigate(`/contracts/view/${id}`)
    }

    function handleRedirectToCreateContractualization () {
        navigate(`/contracts/new`)
    }

    return (
        <Row>
            <Col sm={12} lg={10}>
                <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
                    <p className="h2">Contratualizações</p>
                    <div>
                        <Button
                            color="primary-700"
                            className="d-flex align-items-center"
                            onClick={handleRedirectToCreateContractualization}
                        >
                            <MdAdd size={20} />
                            Nova contratualização
                        </Button>
                    </div>
                </div>

                {
                    contracts.map((e) => {
                        return (
                            <ContractTile
                                contractualization={e}
                                key={e.id}
                                onClick={() => handleRedirectToViewContractualization(e.id)}
                            />
                        )
                    })
                }

                {
                    isLoading && <Loading />
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
            </Col>
        </Row>
    )
}