import { RouteEncapsulator } from "../app/Components/RoutesEncapsulator";
import { ScaffoldProvider } from "../contexts/ScaffoldContext";

export function AuthenticatedRoutes() {
  return (
    <ScaffoldProvider>
      <RouteEncapsulator />
    </ScaffoldProvider>
  );
}
