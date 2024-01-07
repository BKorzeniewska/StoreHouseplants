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
        <Row>
          <Col>
            <h2>Panel administratora</h2>
          </Col>
        </Row>
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
            <Link to="/admin/users" className="admin-link">
              <Button variant="primary" size="lg">
                <FaTruck className="mr-2" />
                Dostawa
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </AppWrapper>
  );
};
