import { Col, Row } from "reactstrap";
import { CustomChart } from "../../components/Chart";
import { useScaffold } from "../../contexts/ScaffoldContext";

export function HomePage() {
  const { size, isOpen } = useScaffold()

  return (
    <div className={`${isOpen && size > 769 ? 'content' : 'content-whitout-margin '} p-2 p-md-5`}>
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
  )
}