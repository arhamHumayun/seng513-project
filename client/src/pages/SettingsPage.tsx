import React from "react";
import { useState } from 'react';
import profile from './../assets/default_profile.png';
import NavBar from '../components/NavBarFull';
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

const center = {
  position: 'absolute' as 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

const border = {
  paddingLeft : '15vmax',
  paddingRight : '15vmax',
  paddingTop : '5vh',
  paddingBottom : '5vh',
  border : '2px',
  borderStyle : 'solid',
  borderColor : 'black',
  borderRadius : '10px'
};

const profilePic = {
  width : "10vmax",
}

function Settings() {
  const user = localStorage.getItem("user"); // get user from browser storage
  let userObj = null;
  if (user != null) {
    userObj = JSON.parse(user);
  }

  return (
    <div>
      <NavBar/>       
      <Container style={center}>
        <Row className="mt-4 px-5" style={border}>
					<Row className="text-left"><Col>
						<Button variant="outline-dark" href="/profile">Back</Button>
					</Col></Row>
					<Row className="mb-4 row justify-content-center">
            <Image style={profilePic} src={profile} alt="profilePic" />
						<Form.Label className="float-left display-5" variant="outline-dark">{userObj.name}</Form.Label>
					</Row>
					<Row><Col className="mt-4">
            <Button size="lg" variant="outline-dark">Update Profile Picture</Button>
          </Col></Row>
					<Row><Col className="mt-4">
            <Button size="lg" variant="outline-dark">Change Username</Button>
          </Col></Row>
					<Row><Col className="mt-4 mb-5">
            <Button size="lg" variant="outline-dark">Change Password</Button>
          </Col></Row>
					<Row><Col className="mt-5">
            <Button size="sm" variant="outline-dark">Delete Account</Button>
          </Col></Row>
				</Row>
      </Container>
    </div>  
  );
}

export default Settings;