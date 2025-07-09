import React from 'react';
import { Container, Nav, Navbar, Row } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import '../Header/header.css'

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="header-section">
      <Container>
        <Row>
          <Navbar expand="lg" className="bg-body-tertiary mb-3 shadow">
            <Navbar.Brand as={NavLink} to="/" className="fw-bold fst-italic custom-navbrand">
              AEM Rentcar
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto text-center">
                {isHomePage ? (
                  <Nav.Link href="#home" className="mx-lg-2 custom-navlink">
                    Home
                  </Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} to="/" className="mx-lg-2 custom-navlink">
                    Home
                  </Nav.Link>
                )}
                {isHomePage ? (
                  <Nav.Link href="#booking" className="mx-lg-2 custom-navlink">
                    Booking
                  </Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} to="/#booking" className="mx-lg-2 custom-navlink">
                    Booking
                  </Nav.Link>
                )}
                {isHomePage ? (
                  <Nav.Link href="#cars" className="mx-lg-2 custom-navlink">
                    Cars
                  </Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} to="/#cars" className="mx-lg-2 custom-navlink">
                    Cars
                  </Nav.Link>
                )}
                {isHomePage ? (
                  <Nav.Link href="#service" className="mx-lg-2 custom-navlink">
                    Service
                  </Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} to="/#service" className="mx-lg-2 custom-navlink">
                    Service
                  </Nav.Link>
                )}
                {isHomePage ? (
                  <Nav.Link href="#contact" className="mx-lg-2 custom-navlink">
                    Contact Us
                  </Nav.Link>
                ) : (
                  <Nav.Link as={NavLink} to="/#contact" className="mx-lg-2 custom-navlink">
                    Contact Us
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Container>
    </header>
  );
};

export default Header;