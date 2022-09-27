import { Alert, Button, Input, Select } from "@vechaiui/react";
import {
  MagnifyingGlass,
  NumberSix,
  SortAscending,
  SortDescending,
} from "phosphor-react";
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContractStatus } from "../../../enums/ContractStatus";
import { parseContractStatus } from "../../../helpers/ContractStatus";
import { showErrorToast } from "../../../helpers/Toast";
import { GoBack } from "../../Components/GoBackIcon";
import { Loading } from "../../Components/Loading";
import { TwContainer } from "../../Components/Tailwind/Container";
import { Contract } from "../../Models/Contract";
import { getContractualizations } from "../../services/Contractualizations";
import { ContractualizationTile } from "./Components/ContractualizationTile";
import { ContractualizationsContent } from "./Components/Index";

export function Contracts() {
  const [contracts, setContracts] = useState<Array<Contract>>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [showPagination, setShowPagination] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    findContracts();
  }, [perPage, page, search, page, order, status]);

  async function findContracts() {
    setLoading(true);
    getContractualizations({ search, order, perPage, page, status })
      .then(({ data }) => {
        const { data: res } = data;
        const { meta } = data;
        setContracts(res);

        setTotal(meta.total);

        setShowPagination(meta.total / meta.per_page > 1);
      })
      .catch((_error) => {
        showErrorToast({
          message: "Não foi possível carregar suas contratualizações",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleRedirectToViewContractualization(id: number) {
    navigate(`/contracts/view/${id}`);
  }

  function handleRedirectToCreateContractualization() {
    navigate(`/contracts/new`);
  }

  return (
    <TwContainer>
      <div className="flex items-center flex-wrap justify-between mb-10">
        <GoBack text="Contratualizações" />
        <div>
          <Button
            variant="solid"
            color="blue"
            onClick={handleRedirectToCreateContractualization}
          >
            Adicionar
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-5 lg:gris-cols-2 grid-cols-1 gap-2 mb-2">
        <Input.Group className="col-span-1 md:col-span-2">
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
            {Object.values(ContractStatus).map((e) => {
              return (
                <option value={e} key={e}>
                  {parseContractStatus(e)}
                </option>
              );
            })}
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
              Mais antigos
            </>
          ) : (
            <>
              <SortDescending size={20} />
              Mais recentes
            </>
          )}
        </Button>
      </div>

      {loading && <Loading />}

      {contracts.length > 0 ? (
        <ContractualizationsContent>
          {contracts.map((e) => {
            return <ContractualizationTile contract={e} key={e.id} />;
          })}

          {showPagination && (
            <Pagination
              className="flex space-x-1 justify-center mt-10 flex-wrap"
              itemRender={(p, type) => {
                return (
                  <>
                    {type === "next" && (
                      <Button
                        className="shadow-lg border-blue-200"
                        color="blue"
                        onClick={() => setPage(p)}
                        title="Próximo"
                      >
                        Próximo
                      </Button>
                    )}
                    {type === "prev" && (
                      <Button
                        className="shadow-lg border-blue-200"
                        color="blue"
                        onClick={() => setPage(p)}
                        title="Anterior"
                      >
                        Anterior
                      </Button>
                    )}
                    {type === "page" && (
                      <Button
                        className="shadow-lg border-blue-200"
                        color="blue"
                        onClick={() => setPage(p)}
                      >
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
          )}
        </ContractualizationsContent>
      ) : (
        <Alert variant="solid" color="blue">
          Não foi encontrado nenhuma contratualização
        </Alert>
      )}
    </TwContainer>
  );
}
