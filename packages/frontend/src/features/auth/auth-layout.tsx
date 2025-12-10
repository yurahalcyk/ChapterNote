import { Col, Container, Row } from 'react-bootstrap';
import styles from './auth-layout.module.scss';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className={`${styles.authBgCustom}`}>
      <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <h1 className="mb-4">Welcome to ChapterNote</h1>
        <Row>
          <Col className="mx-auto">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
