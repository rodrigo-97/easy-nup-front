import {
  ChartLine,
  Folders,
  Handshake,
  Kanban,
  Pen,
  SignOut,
  UsersThree,
} from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { logout } from "../services/Auth";
import { SideNavTile } from "./Tailwind/SideNavTile";

type Props = {
  toggleDrawer?: Function;
};

export function CompanySideOptions({ toggleDrawer }: Props) {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  function handleRedirectToAnotherRoute({ route }: { route: string }) {
    toggleDrawer && toggleDrawer();
    navigate(route);
  }

  async function handleLogout() {
    await logout();
    localStorage.removeItem("APP_TOKEN");
    setIsAuthenticated(false);
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="space-y-2">
        <SideNavTile>
          <Handshake weight="bold" size={20} className="mr-5" />
          EasyNup
        </SideNavTile>
        <SideNavTile onClick={() => handleRedirectToAnotherRoute({ route: "" })}>
          <ChartLine size={20} weight="bold" className="mr-5" />
          Dashboard
        </SideNavTile>
        <SideNavTile
          onClick={() => handleRedirectToAnotherRoute({ route: "contracts" })}
        >
          <Folders weight="fill" size={20} className="mr-5" />
          Contratualizações
        </SideNavTile>
        <SideNavTile>
          <Kanban weight="bold" size={20} className="mr-5" />
          Projetos
        </SideNavTile>
        <SideNavTile>
          <Pen size={20} weight="bold" className="mr-5" />
          Análises
        </SideNavTile>
        <SideNavTile>
          <UsersThree size={20} weight="bold" className="mr-5" />
          Analistas
        </SideNavTile>
        <SideNavTile
          onClick={() => handleRedirectToAnotherRoute({ route: "clients" })}
        >
          <Handshake weight="bold" size={20} className="mr-5" />
          Clientes
        </SideNavTile>
      </div>
      <div className="mb-10">
        <SideNavTile onClick={handleLogout}>
          <SignOut weight="bold" size={20} className="mr-5" />
          Sair
        </SideNavTile>
      </div>
    </div>
  );
}
