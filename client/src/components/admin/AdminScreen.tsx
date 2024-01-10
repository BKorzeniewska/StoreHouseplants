import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppWrapper } from '../common/AppWrapper';
import { useError } from '../common/ErrorContext';
import { FaNewspaper, FaUserCog, FaPagelines, FaSeedling, FaSquare ,FaFolder, FaTruck } from 'react-icons/fa';

export const AdminScreen = () => {
  const { setError } = useError();

  return (
    <AppWrapper hideSidebar>
      <Container className="my-5">

        <div className=" justify-content-start mb-3"  style={{marginLeft:'120px'}}>
        <Row>
          <Col>
            <h2  style={{textAlign:'center'}}><strong>Panel administratora</strong></h2>
          </Col>
        </Row>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div>

        <Row className="mt-4">
          <Col>
            <Link to="/admin/plants" className="admin-link">
              <Button variant="primary" size="lg">
                <FaPagelines className="mr-2" />
                Rośliny
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/admin/species" className="admin-link">
              <Button variant="primary" size="lg">
                <FaFolder className="mr-2" />
                Gatunki
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/admin/accessories" className="admin-link">
              <Button variant="primary" size="lg">
                <FaSquare className="mr-2" />
                Akcesoria
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/admin/grounds" className="admin-link">
              <Button variant="primary" size="lg">
                <FaSeedling className="mr-2" />
                Podłoża
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/admin/articles" className="admin-link">
              <Button variant="primary" size="lg">
                <FaNewspaper className="mr-2" />
                Artykuły i rozdziały
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/admin/users" className="admin-link">
              <Button variant="primary" size="lg">
                <FaUserCog className="mr-2" />
                Użytkownicy
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/admin/delivery" className="admin-link">
              <Button variant="primary" size="lg">
                <FaTruck className="mr-2" />
                Dostawacy
              </Button>
            </Link>
          </Col>
        </Row>
          </div>
          <div>
            <img style={{maxHeight:'500px',width:'auto' }} src={require("../../assets/adm.png")} />
          </div>
        </div>

        </div>
      </Container>
    </AppWrapper>
  );
};
