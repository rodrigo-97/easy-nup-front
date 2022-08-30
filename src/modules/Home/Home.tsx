import { useEffect, useState } from "react";
import { BsMoonFill, BsSun } from 'react-icons/bs';
import { FaCentercode } from "react-icons/fa";
import { MdMenu } from 'react-icons/md';
import { Button, Col, Navbar, Offcanvas, OffcanvasBody, Row } from "reactstrap";
import { ProfileHeader } from "../../components/ProfileHeader";
import { Tile } from "../../components/Tile";
import { useTheme } from "../../contexts/ThemeContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from "react-chartjs-2";


export function HomePage() {
  const [isOpen, setIsOpen] = useState(true)
  const [size, setSize] = useState(0)

  const { theme, toggleTheme } = useTheme()
  const toggleOffcanvas = () => setIsOpen(!isOpen)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [23, 87, 23, 90, 78, 23, 23],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [23, 87, 23, 90, 78, 23, 23].reverse(),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const data2 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [23, 87, 23, 90, 78, 23, 23],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [23, 87, 23, 90, 78, 23, 23].reverse(),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

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
          <Row className="gy-5">
            <Col xl={4} lg={6} sm={12}>
              <Bar options={{ ...options, maintainAspectRatio: false }} data={data} height={300} />
            </Col>
            <Col xl={4} lg={6} sm={12}>
              <Bar options={{ ...options, maintainAspectRatio: false }} data={data} height={300} />
            </Col>
            <Col xl={4} lg={6} sm={12}>
              <Bar options={{ ...options, maintainAspectRatio: false }} data={data} height={300} />
            </Col>
          </Row>
          <Row className="mt-5">

          </Row>
          <Row className="mt-5">
            <Col sm={12}>
              <Line options={{ ...options, maintainAspectRatio: false }} data={data} height={300} />
            </Col>
          </Row>
        </div>
      </div>
    </div >
  )
}