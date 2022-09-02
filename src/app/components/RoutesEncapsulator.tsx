import { Route, Routes } from "react-router-dom";
import { useScaffold } from "../contexts/ScaffoldContext";
import { Contracts } from "../modules/Contracts";
import { HomePage } from "../modules/Home/Home";
import { Scaffold } from "./Scaffold";

export function RouteEncapsulator() {
    const { isOpen, size } = useScaffold()
    
    return (
        <Scaffold>
            <div className={`${isOpen && size > 769 ? 'content' : 'content-whitout-margin '} p-2 p-md-5`}>
                <Routes>
                    <Route path="/hp" element={<HomePage />} />
                    <Route path="/contracts" element={<Contracts />} />
                    <Route path="*" element={<p>Ops</p>} />
                </Routes>
            </div>
        </Scaffold>
    )
}