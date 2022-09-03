import { useAuth } from "./contexts/AuthContext";
import { AuthenticatedRoutes } from "./routes/AuthenticatedRoutes";
import { UnauthenticatedRoutes } from "./routes/UnauthenticatedRoutes";

function App() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
}

export default App;
