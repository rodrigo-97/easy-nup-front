import React, { useEffect, useState } from "react";

import { IconButton, Switch } from "@vechaiui/react";
import { Handshake, List } from "phosphor-react";
import { useTheme } from "../../contexts/ThemeContext";
import { me } from "../../services/Auth";
import { ClientSideOptions } from "./ClientSideOptions";
import { CompanySideOptions } from "./CompanySideOptions";
import { Drawer } from "./Drawer";
import { Box } from "./Tailwind/Box";
import { NavBar } from "./Tailwind/Nav";
import { SideNav } from "./Tailwind/Sidenav";
import { SideNavTile } from "./Tailwind/SideNavTile";

type Props = {
  children: React.ReactElement;
};

export function Scaffold({ children }: Props) {
  const { theme, toggleTheme } = useTheme();
  const [isCompany, setIsCompany] = useState(true);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    me().then(({ data }) => {
      if (data.company) {
        setIsCompany(true);
      } else {
        setIsCompany(false);
      }
    });
  }, []);

  const toggleDrawer = () => setIsOpen(p => !p)

  return (
    <Box className="min-h-screen text-[#344767] flex flex-col">
      <Drawer setIsOpen={setIsOpen} isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <NavBar className="fixed">
        <SideNavTile onClick={() => setIsOpen(!isOpen)}>
          <Handshake weight="bold" size={20} className="mr-5" />
          EasyNup
        </SideNavTile>
        <Switch
          onChange={toggleTheme}
          color="blue"
          checked={theme === "light"}
          className="hidden lg:block"
        />
        <IconButton
          variant="solid"
          color="blue"
          onClick={toggleDrawer}
          className="flex lg:hidden"
        >
          <List />
        </IconButton>
      </NavBar>
      <SideNav>
        <div className="space-y-2 mt-16 h-fit">
          {isCompany ? <CompanySideOptions /> : <ClientSideOptions />}
        </div>
      </SideNav>
      <div className="lg:ml-64 lg:p-10 p-5 mt-20">{children}</div>
    </Box>
  );
}
