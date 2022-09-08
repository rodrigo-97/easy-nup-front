import { VechaiProvider } from "@vechaiui/react";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { AuthenticatedRoutes } from "./routes/AuthenticatedRoutes";
import { UnauthenticatedRoutes } from "./routes/UnauthenticatedRoutes";

function App() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  setDefaultOptions({
    locale: ptBR,
  });

  return isAuthenticated ? (
    <VechaiProvider colorScheme={theme}>
      <UserProvider>
        <AuthenticatedRoutes />
      </UserProvider>
    </VechaiProvider>
  ) : (
    <VechaiProvider colorScheme={theme}>
      <UnauthenticatedRoutes />
    </VechaiProvider>
  );
}

export default App;
