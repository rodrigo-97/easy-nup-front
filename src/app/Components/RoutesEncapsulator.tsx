import { Route, Routes } from "react-router-dom";
import { Analisys } from "../Modules/Analysis/Index";
import { Analysts } from "../Modules/Analysts/Index";
import { Clients } from "../Modules/Clients/Index";
import { CreateContractualization } from "../Modules/Contractualizations/CreateContractualization";
import { Contracts } from "../Modules/Contractualizations/Index";
import { ViewContract } from "../Modules/Contractualizations/ViewContract";
import { HomePage } from "../Modules/Home/Home";
import { Projects } from "../Modules/Projects/Index";
import { Scaffold } from "./Scaffold";

export function RouteEncapsulator() {
  return (
    <Scaffold>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="contracts">
          <Route index element={<Contracts />} />
          <Route path="view/:id" element={<ViewContract />} />
          <Route path="new" element={<CreateContractualization />} />
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
      </Routes>
    </Scaffold>
  );
}
