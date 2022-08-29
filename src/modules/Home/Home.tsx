import { useEffect, useState } from "react";
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { FaCentercode } from "react-icons/fa";
import { MdMenu } from 'react-icons/md';
import { Button, Navbar, Offcanvas, OffcanvasBody } from "reactstrap";
import { ProfileHeader } from "../../components/ProfileHeader";
import { Tile } from "../../components/Tile";
import { AuthenticatedRoutes } from "../../routes/AuthenticatedRoutes";

export function HomePage() {
  const [isOpen, setIsOpen] = useState(true)
  const [size, setSize] = useState(0)


  const toggleOffcanvas = () => setIsOpen(!isOpen)

  const [isDark, setIsDark] = useState(false);

  const toggleMode = () => {
    setIsDark(p => !p)
    if (isDark) {
      document.body.classList.remove('dark')
      return document.body.classList.add('light')
    }

    document.body.classList.remove('light')
    return document.body.classList.add('dark')
  }

  // useEffect(() => {
  //   document.body.classList.remove('light')
  //   return document.body.classList.add('dark')
  // }, [])

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => setSize(window.innerWidth)
    );
  }, []);


  useEffect(() => {
    if (size <= 769) {
      return setIsOpen(false)
    }

    return setIsOpen(true)
  }, [size])


  console.log(size)

  return (
    <div>
      <Offcanvas
        isOpen={isOpen}
        backdrop={size <= 769 ? true : false}
        className='py-4 border-0'
        toggle={toggleOffcanvas}
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
        <Navbar className="d-flex border-left-0">
          <Button color="primary-700" onClick={toggleOffcanvas}>
            <MdMenu />
          </Button>
          <Button color="primary-700" className="d-flex align-items-center gap-2" onClick={toggleMode}>
            {
              isDark ? (
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
          <AuthenticatedRoutes />
        </div>
      </div>
    </div >
  )
}