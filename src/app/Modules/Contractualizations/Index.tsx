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
import { showErrorToast } from "../../../helpers/Toast";
import { getContractualizations } from "../../../services/Contractualizations";
import { GoBack } from "../../Components/GoBackIcon";
import { TwContainer } from "../../Components/Tailwind/Container";
import { Contract } from "../../Models/Contract";
import { ContractualizationTile } from "./Components/ContractualizationTile";
import { ContractualizationsContent } from "./Components/Index";

export function Contracts() {
  const [contracts, setContracts] = useState<Array<Contract>>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    findContracts();
  }, [perPage, page, search, page, order]);

  async function findContracts() {
    setIsLoading(true);
    getContractualizations({ search, order, perPage, page })
      .then(({ data }) => {
        setContracts(data.data);

        setTotal(data.meta.total);
      })
      .catch((_error) => {
        showErrorToast({
          message: "Não foi possível carregar suas contratualizações",
        });
      })
      .finally(() => {
        setIsLoading(false);
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
            <option value="">Qtd. por página</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
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

      {contracts.length > 0 ? (
        <ContractualizationsContent>
          {contracts.map((e) => {
            return <ContractualizationTile contractualization={e} key={e.id} />;
          })}

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
            pageSizeOptions={['10', '15', '30', '50', '100']}
            nextIcon={<NumberSix />}
            defaultPageSize={10}
            total={total}
            pageSize={perPage}
          />
        </ContractualizationsContent>
      ) : (
        <Alert variant="solid" color="blue">
          Você não possui nenhuma contratualização
        </Alert>
      )}
    </TwContainer>
  );
}
