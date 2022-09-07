import { VechaiProvider } from "@vechaiui/react";
import { setDefaultOptions } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";
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
      <AuthenticatedRoutes />
    </VechaiProvider>
  ) : (
    <VechaiProvider colorScheme={theme}>
      <UnauthenticatedRoutes />
    </VechaiProvider>
  );
}

export default App;
