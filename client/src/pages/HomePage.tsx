import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBarPartial';
import computer from './../assets/computer.png';
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

const center = {
    position: 'absolute' as 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
};

function Home() {
  return (
    <div>
      <NavBar />
      <Container style={center}>
        <Row>
          <Col className="text-left" md={{span: 9, offset: 0 }}>
            <Row>
              <Form.Label className="display-3">Become Lightning Fast at Writing Code!</Form.Label>
            </Row>
            <Row>
              <Form.Label className="display-5">Compete in races against other players or practice solo.</Form.Label>
            </Row>
            <br/>           
            <Row xs={3}>
              <Button variant="outline-dark" type="submit" href="/signin">Start Practicing Now</Button>
            </Row>
          </Col>
          <Col className="text-center" md={{span: 3, offset: 0 }}>
            <Image src={computer} alt="computer" />
          </Col>
        </Row>
      </Container>
    </div>  
  );
}

export default Home;