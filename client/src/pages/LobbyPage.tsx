import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBarFull';
import { Form, Button, Container, Row, Col, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3001"

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

function Lobby() {
  const user = localStorage.getItem("user"); // get user from browser storage
  let userObj: { name: string; _id: string; } | null = null;
  if (user != null) {
    userObj = JSON.parse(user);
  }

  // page navigation
  let navigate = useNavigate(); 
  const routeChange = (path : string) =>{ 
    navigate(path);
  }

  // remove player
  async function leave() {
    try {
        const response1 = await axios.get('/lobby/getLobby/' + userObj!._id);
        console.log(response1.data.code)
        const response2 = await axios.get('/lobby/leave/' + userObj!._id + "/" + response1.data.code);
        console.log(response2.data)
        routeChange("/newgame"); // change path on success
    } catch (err) {
      console.log(err)
    }
  }

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
              <Button variant="outline-dark" onClick={(event) => {
                event.preventDefault();
                leave();                
              }}>Leave Race</Button>
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

export default Lobby;