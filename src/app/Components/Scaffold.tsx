import React from "react";

import { Switch } from "@vechaiui/react";
import {
  Handshake
} from "phosphor-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Box } from "./Tailwind/Box";
import { NavBar } from "./Tailwind/Nav";
import { SideNav } from "./Tailwind/Sidenav";
import { SideNavTile } from "./Tailwind/SideNavTile";
import { useUser } from "../../contexts/UserContext";
import { CompanySideOptions } from "./CompanySideOptions";
import { ClientSideOptions } from "./ClientSideOptions";

type Props = {
  children: React.ReactElement;
};

export function Scaffold({ children }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { isCompany } = useUser()

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
          {
            isCompany ? (
              <CompanySideOptions />
            ) : (
              <ClientSideOptions />
            )
          }
        </div>
      </SideNav>
      <div className="lg:ml-64 lg:p-10 p-5 mt-20">{children}</div>
    </Box>
  );
}
