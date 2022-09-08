import { Route, Routes } from "react-router-dom";
import { LoginContainer } from "../app/Modules/Auth/components/LoginContainer";
import { ForgotPassword } from "../app/Modules/Auth/ForgotPassword";
import { LoginPage } from "../app/Modules/Auth/Login";
import { ResetPassword } from "../app/Modules/Auth/ResetPassword";

export function UnauthenticatedRoutes() {
  return (
    <LoginContainer>
      <Routes>
        <Route path="">
          <Route index element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<>Uai sô</>} />
        </Route>
      </Routes>
    </LoginContainer>
  );
}
