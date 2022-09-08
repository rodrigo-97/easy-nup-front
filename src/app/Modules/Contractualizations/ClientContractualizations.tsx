import { Alert, Button, Input, Select } from "@vechaiui/react";
import { MagnifyingGlass, NumberSix, SortAscending, SortDescending } from "phosphor-react";
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContractStatus } from "../../../enums/ContractStatus";
import { parseContractStatus } from "../../../helpers/ContractStatus";
import { getClientContracts } from "../../../services/Client";
import { GoBack } from "../../Components/GoBackIcon";
import { TwContainer } from "../../Components/Tailwind/Container";
import { Contract } from "../../Models/Contract";
import { ContractualizationTile } from "./Components/ContractualizationTile";
import { ContractualizationsContent } from "./Components/Index";

export function ClientContractualizations() {

  const [contracts, setContracts] = useState<Contract[]>([])
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showPagination, setShowPagination] = useState(false)
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const unsubscribe = findContracts()

    return () => {
      unsubscribe
    }
  }, [perPage, search, order, page, status])

  async function findContracts() {
    getClientContracts({ order, page, perPage, search, status })
      .then(({ data }) => {
        setContracts(data.data)
        setTotal(data.meta.total)
        setShowPagination(data.meta.total / data.meta.per_page > 1)
      })
      .catch(() => {

      })
  }

  return (
    <div>
      <GoBack text="Contratos" />

      <TwContainer className="mt-10">
        <div className="flex justify-end mb-3 space-x-3">
          <Input.Group className="flex-grow">
            <Input
              placeholder="Pesquise um contrato pelo nome"
              onChange={(e) => setSearch(e.target.value)}
            />
            <Input.RightElement
              children={
                <MagnifyingGlass
                  weight="duotone"
                  className="hover:cursor-pointer"
                  size={20}
                  onClick={findContracts}
                />
              }
            />
          </Input.Group>
          <div>
            <Select
              onChange={(e) => {
                setPerPage(+e.target.value);
              }}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Select>
          </div>
          <div>
            <Select
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="">status</option>
              {
                Object.values(ContractStatus).map((e) => {
                  return (
                    <option value={e}>{parseContractStatus(e)}</option>
                  )
                })
              }
            </Select>
          </div>
          <Button
            onClick={() => {
              setOrder((p) => (p === "asc" ? "desc" : "asc"));
            }}
          >
            {order === "asc" ? (
              <>
                <SortAscending size={20} />
                Mais recentes
              </>
            ) : (
              <>
                <SortDescending size={20} />
                Mais antigos
              </>
            )}
          </Button>
        </div>

        {
          contracts.length > 0 ? (
            <ContractualizationsContent>
              {contracts.map(e => {
                return (
                  <ContractualizationTile contract={e} key={e.id} />
                )
              })}

              {
                showPagination && (
                  <Pagination
                    className="flex space-x-1 justify-center mt-10 flex-wrap"
                    itemRender={(p, type) => {
                      return (
                        <>
                          {type === "next" && (
                            <Button className="shadow-lg border-blue-200" color="blue" onClick={() => setPage(p)} title="Próximo">
                              Próximo
                            </Button>
                          )}
                          {type === "prev" && (
                            <Button className="shadow-lg border-blue-200" color="blue" onClick={() => setPage(p)} title="Anterior">
                              Anterior
                            </Button>
                          )}
                          {type === "page" && (
                            <Button className="shadow-lg border-blue-200" color="blue" onClick={() => setPage(p)}>
                              {p}
                            </Button>
                          )}
                        </>
                      );
                    }}
                    nextIcon={<NumberSix />}
                    defaultPageSize={10}
                    total={total}
                    pageSize={perPage}
                  />
                )
              }
            </ContractualizationsContent>
          ) : (
            <Alert variant="solid" color="blue">
              Não foi encontrado nenhuma contratualização
            </Alert>
          )
        }
      </TwContainer>
    </div>
  )
}