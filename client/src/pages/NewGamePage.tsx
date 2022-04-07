import React, { Component, useState, useEffect } from "react";
import NavBar from '../components/NavBarFull';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axiosInstance from "axios"

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

const line = {
  border : '1px',
  borderStyle : 'solid',
  borderColor : 'black',
  height : '2px',
}

function NewGame() {
  return (
    <div>
      <NavBar/>       
      <Container style={center}>
        <Col style={border}>
          <Row>
            <Form.Label className="display-5">Races</Form.Label>
          </Row>
          <Row className="mt-4 px-5">
            <Button variant="outline-dark" href="/dummygame">Create New Room</Button>
          </Row>
          <Row className="mt-4">
            <div style={line}/>
          </Row>
          <Row className="mt-4 px-5">
            <Form.Control className="text-center" type="text" placeholder="Room Code" />
          </Row>
          <Row className="mt-2 px-5">
            <Button variant="outline-dark">Join Room</Button>
          </Row>
          <Row className="mt-4">
            <div style={line}/>
          </Row>
          <Row className="mt-4 px-5">
            <Button variant="outline-dark">Start Practice</Button>
          </Row>
        </Col>
      </Container>
    </div>  
  );
}

export default NewGame;