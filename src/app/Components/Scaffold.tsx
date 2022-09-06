import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { logout } from "../../services/Auth";

import {
  ChartLine,
  Folders,
  Handshake,
  Kanban,
  Pen,
  SignOut,
  UsersThree,
} from "phosphor-react";
import { Box } from "./Tailwind/Box";
import { NavBar } from "./Tailwind/Nav";
import { SideNav } from "./Tailwind/Sidenav";
import { SideNavTile } from "./Tailwind/SideNavTile";
import { Switch } from "@vechaiui/react";
import { useTheme } from "../../contexts/ThemeContext";

type Props = {
  children: React.ReactElement;
};

export function Scaffold({ children }: Props) {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    localStorage.removeItem("APP_TOKEN");
    setIsAuthenticated(false);
    navigate("/");
  }

  function handleRedirectToAnotherRoute({ route }: { route: string }) {
    navigate(route);
  }

  const { theme, toggleTheme } = useTheme();

  return (
    <Box className="min-h-screen text-[#344767] flex flex-col">
      <NavBar className="fixed">
        <SideNavTile>
          <Handshake weight="bold" size={20} className="mr-5" />
          EasyNup
        </SideNavTile>
        <Switch
          onChange={toggleTheme}
          color="blue"
          checked={theme === "light"}
        />
      </NavBar>
      <SideNav>
        <div className="space-y-2 mt-16 h-fit">
          <SideNavTile
            onClick={() => handleRedirectToAnotherRoute({ route: "" })}
          >
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
          <SideNavTile>
            <Handshake weight="bold" size={20} className="mr-5" />
            Clientes
          </SideNavTile>
          <SideNavTile
            className="absolute bottom-6 w-56"
            onClick={handleLogout}
          >
            <SignOut weight="bold" size={20} className="mr-5" />
            Sair
          </SideNavTile>
        </div>
      </SideNav>
      <div className="lg:ml-64 lg:p-10 p-5 mt-20">{children}</div>
    </Box>
  );
}
