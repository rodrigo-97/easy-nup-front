import { useEffect, useState } from "react";
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { FaCentercode } from "react-icons/fa";
import { MdMenu } from 'react-icons/md';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Navbar, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from "reactstrap";
import { CustomChart } from "../../components/Chart";
import { ProfileHeader } from "../../components/ProfileHeader";
import { Tile } from "../../components/Tile";
import { useTheme } from "../../contexts/ThemeContext";

export function HomePage() {
  const [isOpen, setIsOpen] = useState(true)
  const [useBackDrop, setUseBackdrop] = useState(false)
  const [size, setSize] = useState(0)

  const { theme, toggleTheme } = useTheme()
  const getIsUseBackdrop = () => {
    if (size <= 769) {
      setUseBackdrop(true)
    } else {
      setUseBackdrop(false)
    }
  }

  function toggleOffCanvas() {
    getIsUseBackdrop()
    setIsOpen(!isOpen)
  }



  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const width = window.innerWidth
        setSize(width)

        if (width <= 769) {
          toggleOffCanvas()
        }
      }
    );
  }, []);

  useEffect(() => {
    setSize(window.innerWidth)
  }, [])


  return (
    <div>
      <Offcanvas
        isOpen={isOpen}
        backdrop={useBackDrop}
        className='py-4 border-0'
        toggle={toggleOffCanvas}
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
        <Navbar className={`position-relative d-flex border-left-0 ${theme === "light" ? 'shadow-sm' : ''}`}>
          <Button size="sm" color="primary-700" onClick={toggleOffCanvas}>
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
        <div className="container-fluid p-md-5 p-2">
          <p className="display-6">Dashboard</p>
          <Row>
            <Col xl={6} sm={12}>
              <CustomChart />
            </Col>
            <Col xl={6} sm={12}>
              <CustomChart />
            </Col>
            <Col xl={6} sm={12}>
              <CustomChart />
            </Col>
            <Col xl={6} sm={12}>
              <CustomChart />
            </Col>
          </Row>
          <Row>
            <Col xl={6} sm={12}>
              <CustomChart />
            </Col>
            <Col xl={6} sm={12}>
              <CustomChart />
            </Col>
            <Col xl={6} sm={12}>
              <CustomChart />
            </Col>
            <Col xl={6} sm={12}>
              <CustomChart />
            </Col>
          </Row>
        </div>
      </div>
    </div >
  )
}