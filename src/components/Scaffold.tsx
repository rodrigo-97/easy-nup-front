import React, { useEffect, useState } from "react"
import { BsMoonFill, BsSun } from "react-icons/bs"
import { FaCentercode } from "react-icons/fa"
import { MdMenu } from "react-icons/md"
import { Button, Navbar, Offcanvas, OffcanvasBody } from "reactstrap"
import { useScaffold } from "../contexts/ScaffoldContext"
import { useTheme } from "../contexts/ThemeContext"
import { ProfileHeader } from "./ProfileHeader"
import { Tile } from "./Tile"

type Props = {
    children: React.ReactElement
}

export function Scaffold({ children }: Props) {
    const { theme, toggleTheme } = useTheme()
    const { isOpen, toggleSideNav, useBackDrop } = useScaffold()

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
                        <Tile icon={FaCentercode} title="Projetos" onClick={() => console.log("fosdae")} />
                        <Tile icon={FaCentercode} title="Análises" onClick={() => console.log("fosdae")} />
                        <Tile icon={FaCentercode} title="Analistas" onClick={() => console.log("fosdae")} />
                        <Tile icon={FaCentercode} title="Clientes" onClick={() => console.log("fosdae")} />
                    </div>
                    <Tile icon={FaCentercode} title="Sair" onClick={() => console.log("fosdae")} />
                </OffcanvasBody>
            </Offcanvas>

            <Navbar 
                className={`
                    position-relative d-flex border-left-0
                    ${theme === "light" ? 'shadow-sm' : ''}
                    ${isOpen ? 'is-open': ''}
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