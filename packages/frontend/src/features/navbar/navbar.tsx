import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router';
import styles from './navbar.module.scss';

export const NavigationBar = () => {
  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className={styles.navBar}
      >
        <Container>
          <Navbar.Brand>ChapterNote</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto gap-4">
              <Nav.Link as={NavLink} to="/dashboard">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/books">
                Add a book
              </Nav.Link>
              <Nav.Link as={NavLink} to="/notes">
                Add a note
              </Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-light">Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};
