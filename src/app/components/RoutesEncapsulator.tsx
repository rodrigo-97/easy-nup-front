import { Route, Routes } from "react-router-dom";
import { useScaffold } from "../../contexts/ScaffoldContext";
import { Contracts } from "../modules/Contractualizations/Index";
import { CreateContractualization } from "../modules/Contractualizations/CreateContractualization";
import { ViewContract } from "../modules/Contractualizations/ViewContract";
import { HomePage } from "../modules/Home/Home";
import { Scaffold } from "./Scaffold";

export function RouteEncapsulator() {
    const { isOpen, size } = useScaffold()

    return (
        <Scaffold>
            <div className={`${isOpen && size > 769 ? 'content' : 'content-whitout-margin '} px-2 py-4 p-md-5`}>
                <Routes>
                    <Route index element={<HomePage />}  />
                    <Route path="contracts">
                        <Route index element={<Contracts />} />
                        <Route path="view/:id" element={<ViewContract />} />
                        <Route path="new" element={<CreateContractualization />} />
                    </Route>
                    <Route path="*" element={<p>Ops</p>} />
                </Routes>
            </div>
        </Scaffold>
    )
}