import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../modules/Auth/Login";
import { HomePage } from "../modules/Home/Home";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/hp" element={<HomePage />} />
      <Route path="*" element={<p>Ops</p>} />
    </Routes>
  )
}