import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBarFull';
import { Form, Button, Container, Row, Col } from "react-bootstrap";

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

function Settings() {
  return (
    <div>
      <NavBar/>       
      <Container style={center}>
        <Row className="mt-4 px-5" style={border}>
					<Row className="text-left"><Col>
						<Button variant="outline-dark" href="/profile">Back</Button>
					</Col></Row>
					<Row className="mb-4">
						<Form.Label className="float-left" variant="outline-dark">User [with profile picture]</Form.Label>
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