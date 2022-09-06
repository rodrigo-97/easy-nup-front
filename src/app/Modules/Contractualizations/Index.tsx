import { Alert, Button } from "@vechaiui/react";
import { Info } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../../helpers/Toast";
import { getContractualizations } from "../../../services/Contractualizations";
import { GoBack } from "../../Components/GoBackIcon";
import { TwContainer } from "../../Components/Tailwind/Container";
import { Contractualization } from "../../Models/Contractualization";
import { ContractualizationTile } from "./Components/ContractualizationTile";
import { ContractualizationsContent } from "./Components/Index";

export function Contracts() {
  const [contracts, setContracts] = useState<Array<Contractualization>>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    findContracts();
  }, []);

  async function findContracts() {
    setIsLoading(true);
    getContractualizations(page)
      .then(({ data }) => {
        setContracts([...contracts, ...data.data]);

        if (page <= data.meta.total) {
          setPage(data.meta.current_page + 1);
        }

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
      <div className="flex items-center justify-between mb-10">
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

      {contracts.length > 0 ? (
        <ContractualizationsContent>
          {contracts.map((e) => {
            return <ContractualizationTile contractualization={e} key={e.id} />;
          })}
        </ContractualizationsContent>
      ) : (
        <Alert variant="solid" color="blue">
          Você não possui nenhuma contratualização
        </Alert>
      )}
    </TwContainer>
  );
}
