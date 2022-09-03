import React from "react";
import { AiOutlineProject } from "react-icons/ai";
import { BsMoonFill, BsSun } from "react-icons/bs";
import {
  FaChevronLeft,
  FaChevronRight,
  FaFileContract,
  FaHandsHelping,
} from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoMdAnalytics } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Navbar,
  Offcanvas,
  OffcanvasBody,
} from "reactstrap";
import { AppPages } from "../../config/AppPages";
import { useAuth } from "../../contexts/AuthContext";
import { useScaffold } from "../../contexts/ScaffoldContext";
import { useTheme } from "../../contexts/ThemeContext";
import { logout } from "../../services/Auth";
import { ProfileHeader } from "./ProfileHeader";
import { Tile } from "./Tile";

type Props = {
  children: React.ReactElement;
};

export function Scaffold({ children }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { isOpen, toggleSideNav, useBackDrop } = useScaffold();
  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    localStorage.removeItem("APP_TOKEN");
    setIsAuthenticated(false);
    navigate("/");
  }

  return (
    <div>
      <Offcanvas
        isOpen={isOpen}
        backdrop={useBackDrop}
        className="py-4 border-0"
        toggle={toggleSideNav}
        id="off-canvas"
      >
        <ProfileHeader />
        <OffcanvasBody className="_offcanvas p-0">
          <div>
            <Tile icon={AiOutlineProject} title="Projetos" />
            <Tile icon={IoMdAnalytics} title="Análises" />
            <Tile icon={TiGroup} title="Analistas" />
            <Tile icon={FaHandsHelping} title="Clientes" />
            <Tile
              icon={FaFileContract}
              title="Contratos"
              route={AppPages.CONTRACTS}
            />
          </div>
          <Tile icon={ImExit} title="Sair" onClick={handleLogout} />
        </OffcanvasBody>
      </Offcanvas>

      <Navbar
        className={`
                    d-flex border-left-0 pe-4
                    ${theme === "light" ? "shadow-sm" : ""}
                    ${isOpen ? "is-open" : ""}
                `}
      >
        {isOpen ? (
          <FaChevronLeft
            title="Clique para fechar o menu lateral"
            className="pointer"
            onClick={toggleSideNav}
            size={20}
          />
        ) : (
          <FaChevronRight
            title="Clique para abrir o menu lateral"
            className="pointer"
            onClick={toggleSideNav}
            size={20}
          />
        )}
        <FormGroup switch className="d-flex align-items-center gap-2">
          <Input
            type="switch"
            role="switch"
            className="pointer"
            checked={theme !== "dark"}
            onChange={toggleTheme}
          />
          <Label check>
            {theme === "dark" ? <BsMoonFill /> : <BsSun color="#fba94c" />}
          </Label>
        </FormGroup>
      </Navbar>
      {children}
    </div>
  );
}
