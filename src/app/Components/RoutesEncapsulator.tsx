import { Route, Routes } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { Analisys } from "../Modules/Analysis/Index";
import { Analysts } from "../Modules/Analysts/Index";
import { ClientContractualizations } from "../Modules/Clients/ClientContractualizations";
import { ContractsDiff } from "../Modules/Clients/ContractsDiff";
import { Clients } from "../Modules/Clients/Index";
import { CreateContractualization } from "../Modules/Contracts/CreateContractualization";
import { Contracts } from "../Modules/Contracts/Index";
import { ViewContract } from "../Modules/Contracts/ViewContract";
import { HomePage } from "../Modules/Home/Home";
import { Projects } from "../Modules/Projects/Index";
import { Scaffold } from "./Scaffold";

export function RouteEncapsulator() {
  const { isCompany } = useUser();

  function companyRoutes() {
    return (
      <>
        <Route index element={<HomePage />} />
        <Route path="contracts">
          <Route index element={<Contracts />} />
          <Route path="view/:id" element={<ViewContract />} />
          <Route path="new" element={<CreateContractualization />} />
          <Route path="update/:id" element={<CreateContractualization />} />
        </Route>
        <Route path="analysis">
          <Route index element={<Analisys />} />
        </Route>
        <Route path="projects">
          <Route index element={<Projects />} />
        </Route>
        <Route path="clients">
          <Route index element={<Clients />} />
        </Route>
        <Route path="analysts">
          <Route index element={<Analysts />} />
        </Route>
        <Route path="*" element={<p>Ops</p>} />
      </>
    );
  }

  function clientRoutes() {
    return (
      <>
        <Route index element={<>Dashboard </>} />
        <Route path="contracts">
          <Route index element={<ClientContractualizations />} />
          <Route path="view/:id" element={<ViewContract />} />
          <Route path="diff/:id" element={<ContractsDiff />} />
        </Route>
        <Route path="*" element={<p>Ops</p>} />
      </>
    );
  }

  return (
    <Scaffold>
      <Routes>{isCompany ? companyRoutes() : clientRoutes()}</Routes>
    </Scaffold>
  );
}
