import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../app/modules/Auth/Login";

export function UnauthenticatedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    )
}