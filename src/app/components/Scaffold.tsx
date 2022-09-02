import React from "react"
import { AiOutlineProject } from 'react-icons/ai'
import { BsMoonFill, BsSun } from "react-icons/bs"
import { FaFileContract, FaHandsHelping } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import { IoMdAnalytics } from 'react-icons/io'
import { MdMenu } from "react-icons/md"
import { TiGroup } from 'react-icons/ti'
import { useNavigate } from "react-router-dom"
import { Button, Navbar, Offcanvas, OffcanvasBody } from "reactstrap"
import { AppPages } from "../../config/AppPages"
import { useAuth } from "../../contexts/AuthContext"
import { useScaffold } from "../../contexts/ScaffoldContext"
import { useTheme } from "../../contexts/ThemeContext"
import { logout } from "../../services/Auth"
import { ProfileHeader } from "./ProfileHeader"
import { Tile } from "./Tile"

type Props = {
    children: React.ReactElement
}

export function Scaffold({ children }: Props) {
    const { theme, toggleTheme } = useTheme()
    const { isOpen, toggleSideNav, useBackDrop } = useScaffold()
    const { setIsAuthenticated } = useAuth()

    const navigate = useNavigate()

    async function handleLogout() {
        await logout()
        localStorage.removeItem("APP_TOKEN")
        setIsAuthenticated(false)
        navigate('/')
    }

    return (
        <div>
            <Offcanvas
                isOpen={isOpen}
                backdrop={useBackDrop}
                className='py-4 border-0'
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
                        <Tile icon={FaFileContract} title="Contratos" route={AppPages.CONTRACTS} />
                    </div>
                    <Tile icon={ImExit} title="Sair" onClick={handleLogout} />
                </OffcanvasBody>
            </Offcanvas>

            <Navbar
                className={`
                    position-relative d-flex border-left-0
                    ${theme === "light" ? 'shadow-sm' : ''}
                    ${isOpen ? 'is-open' : ''}
                `}
            >
                <Button size="sm" color="primary-700" onClick={toggleSideNav}>
                    <MdMenu />
                </Button>
                <Button size="sm" color="primary-700" className="d-flex align-items-center gap-2" onClick={toggleTheme}>
                    {
                        theme === "dark" ? (
                            <>
                                Tema escuro
                                <BsMoonFill />
                            </>
                        ) : (
                            <>
                                Tema claro
                                <BsSun />
                            </>
                        )
                    }
                </Button>
            </Navbar>
            {children}
        </div>
    )
}