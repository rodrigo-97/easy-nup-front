import { RouteEncapsulator } from "../components/RoutesEncapsulator";
import { ScaffoldProvider } from "../contexts/ScaffoldContext";

export function AuthenticatedRoutes() {
    return (
        <ScaffoldProvider>
            <RouteEncapsulator />
        </ScaffoldProvider>
    )
}