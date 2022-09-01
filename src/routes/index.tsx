import { Route, Routes } from "react-router-dom";
import { Scaffold } from "../components/Scaffold";
import { ScaffoldProvider } from "../contexts/ScaffoldContext";
import { LoginPage } from "../modules/Auth/Login";
import { HomePage } from "../modules/Home/Home";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/hp" element={
        <ScaffoldProvider>
          <Scaffold>
            <HomePage />
          </Scaffold>
        </ScaffoldProvider>
      } />
      <Route path="*" element={<p>Ops</p>} />
    </Routes>
  )
}