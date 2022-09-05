import { Route, Routes } from "react-router-dom";
import { useScaffold } from "../../contexts/ScaffoldContext";
import { Contracts } from "../modules/Contractualizations/Index";
import { CreateContractualization } from "../modules/Contractualizations/CreateContractualization";
import { ViewContract } from "../modules/Contractualizations/ViewContract";
import { HomePage } from "../modules/Home/Home";
import { Scaffold } from "./Scaffold";
import { Analisys } from "../modules/Analysis/Index";
import { Projects } from "../modules/Projects/Index";
import { Clients } from "../modules/Clients/Index";
import { Analysts } from "../modules/Analysts/Index";

export function RouteEncapsulator() {
  const { isOpen, size } = useScaffold();

  return (
    <Scaffold>
      <div
        className={`${isOpen && size > 769 ? "content" : "content-whitout-margin "
          } px-2 py-4 p-md-5`}
      >
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
      </div>
    </Scaffold>
  );
}
