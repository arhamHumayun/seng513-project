import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBarFull';
import { Form, Button, Container, Row, Col, ProgressBar } from "react-bootstrap";

const center = {
  position: 'absolute' as 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

const border = {
  paddingLeft : '10vmax',
  paddingRight : '10vmax',
  paddingTop : '2vh',
  paddingBottom : '2vh',
  border : '2px',
  borderStyle : 'solid',
  borderColor : 'black',
  borderRadius : '10px'
};

function DummyGame() {
  return (
    <div>
      <NavBar/>       
      <Container fluid style={center}>
        <Col>
          <Row className="text-left">
            <Form.Label >Room Code: A3J6K8</Form.Label>
          </Row>
          <Container>
            <Row>
              <Col className="text-left">
                <Form.Label>Racer 1 (you)</Form.Label>
              </Col>
              <Col xs={8}>
                <ProgressBar now={55} />
              </Col>
              <Col>
                <Form.Label>48 wpm</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col className="text-left">
                <Form.Label>Racer 2</Form.Label>
              </Col>
              <Col xs={8}>
                <ProgressBar now={80} />
              </Col>
              <Col>
                <Form.Label>57 wpm</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col className="text-left">
                <Form.Label>Racer 3</Form.Label>
              </Col>
              <Col xs={8}>
                <ProgressBar now={68} />
              </Col>
              <Col>
                <Form.Label>53 wpm</Form.Label>
              </Col>
            </Row>
          </Container>
          <Row>
            <Form.Label>Code Snippet</Form.Label>
          </Row>
          <Container>
            <Row className="text-left" style={border}>
              <Form.Label >def countdown(n):</Form.Label>
              <Form.Label>&emsp;if n less than 0:</Form.Label>
              <Form.Label>&emsp;&emsp;print('Blastoff!')</Form.Label>
              <Form.Label>&emsp;else:</Form.Label>
              <Form.Label>&emsp;&emsp;print(n)</Form.Label>
              <Form.Label>&emsp;&emsp;countdown(n - 1)</Form.Label>
            </Row>
            <br/>
            <Row>
              <Form.Control type="text" placeholder="Type the above code snippet here when the race begins" />
            </Row>
          </Container>
          <br/>
          <Row>
            <Col>
              <Button variant="outline-dark" href="/newgame">Leave Race</Button>
            </Col>
            <Col>
              <Button variant="outline-dark">Start</Button>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>

  );

}

export default DummyGame;