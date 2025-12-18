import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div>
      <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <h1 className="mb-4 fw-bold">Welcome to ChapterNote</h1>
        <Row>
          <Col className="mx-auto">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
