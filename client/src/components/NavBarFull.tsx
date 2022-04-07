import React from "react";
import keyboardIcon from './../assets/keyboard.png';
import userIcon from './../assets/user.png';
import homeIcon from './../assets/home.png';
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
  const user = localStorage.getItem("user"); // get user from browser storage
  let userObj = null;
  if (user != null) {
    userObj = JSON.parse(user);
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand style={appName} href="/">&gt;_ SpeedCode</Navbar.Brand>
        <Navbar.Toggle />
        <Nav className="justify-content-end">
          <Navbar.Brand href="/">
            <img src={homeIcon} style={navIcon} />
          </Navbar.Brand>
          <Navbar.Brand href="/newgame">
            <img src={keyboardIcon} style={navIcon}/>
          </Navbar.Brand>
          {/* <Navbar.Brand href="/profile">
            <img src={userIcon} style={navIcon}/>
          </Navbar.Brand> */}
          <Navbar.Brand href="/profile" style={navItem}>
            <img
              src={userIcon}
              style={navIcon}
              className="d-inline-block align-top"
            />{' '}
            {userObj.name}
          </Navbar.Brand>
          {/* <Nav.Link style={navItem} >{userObj.name}</Nav.Link> */}
          <Nav.Link style={navItem} href="/signin">Sign Out</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBarFull;