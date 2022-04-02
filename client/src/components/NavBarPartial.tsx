import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const appName = {
  fontSize : '36px'
}

const navLink = {
  fontSize : '24px'
}

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={appName} href="#home">&gt;_ SpeedCode</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="justify-content-end">
          <Nav.Link style={navLink} href="#">Sign In</Nav.Link>
          <Nav.Link style={navLink} href="#">Sign Up</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}