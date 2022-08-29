import { useEffect, useState } from "react";
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { FaCentercode } from "react-icons/fa";
import { MdMenu } from 'react-icons/md';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Navbar, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { ProfileHeader } from "../../components/ProfileHeader";
import { Tile } from "../../components/Tile";
import { useTheme } from "../../contexts/ThemeContext";
import { AuthenticatedRoutes } from "../../routes/AuthenticatedRoutes";

export function HomePage() {
  const [isOpen, setIsOpen] = useState(true)
  const [size, setSize] = useState(0)

  const { theme, toggleTheme } = useTheme()
  const toggleOffcanvas = () => setIsOpen(!isOpen)

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const width = window.innerWidth
        setSize(width)

        if (width <= 769) {
          setIsOpen(false)
        }
      }
    );
  }, []);

  useEffect(() => {
    setSize(window.innerWidth)
  }, [])

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Offcanvas
        isOpen={isOpen}
        backdrop={size <= 769 ? true : false}
        className='py-4 border-0'
        toggle={toggleOffcanvas}
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

      <div className={`${isOpen && size > 769 ? 'content' : ''}`}>
        <Navbar className={`d-flex border-left-0 ${theme === "light" ? 'shadow-sm' : ''}`}>
          <Button size="sm" color="primary-700" onClick={toggleOffcanvas}>
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
        <div className="p-2 p-sm-2 p-md-5">
          <p className="display-6">Dashboard</p>
          <AuthenticatedRoutes />
        </div>
      </div>
    </div >
  )
}