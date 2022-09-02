import { RouteEncapsulator } from "../app/components/RoutesEncapsulator";
import { ScaffoldProvider } from "../contexts/ScaffoldContext";

export function AuthenticatedRoutes() {
    return (
        <ScaffoldProvider>
            <RouteEncapsulator />
        </ScaffoldProvider>
    )
}