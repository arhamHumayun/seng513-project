import React from "react";
import keyboard from './../assets/keyboard.png';
import user from './../assets/user.png';
import home from './../assets/home.png';
import { Navbar, Container, Nav } from 'react-bootstrap';

const appName = {
  fontSize : '36px'
}

const navItem = {
  fontSize : '24px'
}

const navIcon = {
  height : '40px',
}

function NavBarFull() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand style={appName} href="/">&gt;_ SpeedCode</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="justify-content-end">
          <Navbar.Brand href="/">
            <img src={home} style={navIcon} />
          </Navbar.Brand>
          <Navbar.Brand href="/newgame">
            <img src={keyboard} style={navIcon}/>
          </Navbar.Brand>
          <Navbar.Brand href="/profile">
            <img src={user} style={navIcon}/>
          </Navbar.Brand>
          <Nav.Link style={navItem} href="/signin">Sign Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBarFull;