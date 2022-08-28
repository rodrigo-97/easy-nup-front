import { useEffect, useState } from "react";
import { Button, Col, Container, Navbar, Offcanvas, OffcanvasBody, OffcanvasHeader, Row } from "reactstrap";
import { GrLogout } from 'react-icons/gr'
import { Tile } from "../../components/Tile";
import { FaCentercode } from "react-icons/fa";
import { ProfileHeader } from "../../components/ProfileHeader";

export function HomePage() {
  const [isOpen, setIsOpen] = useState(true)
  const [size, setSize] = useState(0)

  const toggleOffcanvas = () => setIsOpen(!isOpen)

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth <= 769 ? setIsOpen(false) : setIsOpen(true)
    );
  }, []);

  return (
    <div>
      <Offcanvas isOpen={isOpen} backdrop={false} className='py-4'>
        <ProfileHeader />
        <OffcanvasBody className="p-0">
          <Tile icon={FaCentercode} title="Teste" onClick={() => console.log("fosdae")} />
          <Tile icon={FaCentercode} title="Teste" onClick={() => console.log("fosdae")} />
          <Tile icon={FaCentercode} title="Teste" onClick={() => console.log("fosdae")} />
          <Tile icon={FaCentercode} title="Teste" onClick={() => console.log("fosdae")} />
        </OffcanvasBody>
      </Offcanvas>

      <div style={{ marginLeft: isOpen ? '399px' : '0px' }}>
        {/* <Navbar className="d-flex">
          <Button color="primary-700" className="d-flex align-items-center gap-2">
            Sair
            <GrLogout />
          </Button>
        </Navbar> */}
        <div className="p-sm-2 p-md-5">
          <p className="display-6">Dashboard</p>

          <Row className="g-3">
            <Col xl={2} lg={3} md={6} sm={12}>
              <div className="p-3 border bg-primary-700">Row column</div>
            </Col>
            <Col xl={2} lg={3} md={6} sm={12}>
              <div className="p-3 border bg-primary-700">Row column</div>
            </Col>
            <Col xl={2} lg={3} md={6} sm={12}>
              <div className="p-3 border bg-primary-700">Row column</div>
            </Col>
            <Col xl={2} lg={3} md={6} sm={12}>
              <div className="p-3 border bg-primary-700">Row column</div>
            </Col>
            <Col xl={2} lg={3} md={6} sm={12}>
              <div className="p-3 border bg-primary-700">Row column</div>
            </Col>
            <Col xl={2} lg={3} md={6} sm={12}>
              <div className="p-3 border bg-primary-700">Row column</div>
            </Col>
          </Row>

          <Row className="g-3">
            <Col md={6} sm={12}>
              <div className="p-3 border bg-primary-700">Row column</div>
            </Col>
            <Col md={6} sm={12}>
              <div className="p-3 border bg-primary-700">Row column</div>
            </Col>
          </Row>

          <p>Rodrigo</p>
        </div>
      </div>
    </div>
  )
}