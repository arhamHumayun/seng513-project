import React from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';

const appName = {
  fontSize : '36px'
}

const navLink = {
  fontSize : '24px'
}

function NavBarPartial() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand style={appName} href="/">&gt;_ SpeedCode</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="justify-content-end">
          <Nav.Link style={navLink} href="signin">Sign In</Nav.Link>
          <Nav.Link style={navLink} href="signup">Sign Up</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBarPartial;