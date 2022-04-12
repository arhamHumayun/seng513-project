import React, { Component, useState, useEffect } from "react";
import NavBar from '../components/NavBarFull';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.baseURL = "http://localhost:3002"

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
  const [roomCode, setRoomCode] = useState("");

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

  // create room
  async function create() {
    try {
        const response = await axios.get('/lobby/new/public/' + userObj!._id);
        console.log(response.data)
        routeChange("/lobby/type=public/code=" + response.data); // change path on success
    } catch (err) {
        console.log(err)
    }
    setRoomCode("");
  }
  
  // join room
  async function join() {
    try {
        const response = await axios.get('/lobby/join/' + userObj!._id + '/' + roomCode);
        console.log(response.data)
        routeChange("/lobby/type=public/code=" + roomCode); // change path on success
    } catch (err) {
        console.log(err)
        alert("Lobby does not exist")
    }
  }

  return (
    <div>
      <NavBar/>       
      <Container style={center}>
        <Col style={border}>
          <Row>
            <Form.Label className="display-5">Races</Form.Label>
          </Row>
          <Row className="mt-4 px-5">
            <Button variant="outline-dark" onClick={(event) => {
                event.preventDefault();
                create();                
              }}>Create New Room</Button>
          </Row>
          <Row className="mt-4">
            <div style={line}/>
          </Row>
          <Row className="mt-4 px-5">
            <Form.Control className="text-center" type="text" value={roomCode} placeholder="Room Code" onChange={(event) => {
                setRoomCode(event.target.value);
            }}/>
          </Row>
          <Row className="mt-2 px-5">
            <Button variant="outline-dark" onClick={(event) => {
                event.preventDefault();
                join();                
              }}>Join Room</Button>
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