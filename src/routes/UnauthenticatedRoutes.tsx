import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../modules/Auth/Login";

export function UnauthenticatedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    )
}