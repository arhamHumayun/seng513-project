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

const border2 = {
	paddingLeft : '15px',
	paddingRight : '15px',
  border : '2px',
  borderStyle : 'solid',
  borderColor : 'black',
};

const line = {
  border : '1px',
  borderStyle : 'solid',
  borderColor : 'black',
  height : '2px',
	background: 'black'
}

const profilePic = {
  width : "5vmax",
}

function Profile() {
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
					<Row className="text-right"><Col>
						<Button variant="outline-dark" href="/settings">Profile Settings</Button>
					</Col></Row>
					<Row className="mb-4 row justify-content-center">
            <Image style={profilePic} src={profile} alt="profilePic" />
						<Form.Label className="float-right display-5" variant="outline-dark">{userObj.name}</Form.Label>
					</Row>
					<Row className="mt-4 mb-2">
            <Form.Label className="text-left">Statistics For Today:</Form.Label>
          </Row>
					<Row>
						<Col style={border2} className="ml-4">
							<Form.Label className="mt-2">Total Races</Form.Label>
							<Col><Form.Label>4</Form.Label></Col>
						</Col>
						<Col></Col>
						<Col style={border2}>
							<Form.Label className="mt-2">Average Speed (wpm)</Form.Label>
							<Col><Form.Label>64.3</Form.Label></Col>
						</Col>
						<Col></Col>
						<Col style={border2} className="mr-4">
							<Form.Label className="mt-2">Top Speed (wpm)</Form.Label>
							<Col><Form.Label>71.6</Form.Label></Col>
						</Col>
					</Row>
					<Row className="mt-5 mb-3">
            <div style={line}/>
          </Row>

					<Row className="mt-4 mb-2">
            <Form.Label className="text-left">All-Time Statistics:</Form.Label>
          </Row>
					<Row className="mb-3">
						<Col style={border2} className="ml-4">
							<Form.Label className="mt-2">Total Races</Form.Label>
							<Col><Form.Label>56</Form.Label></Col>
						</Col>
						<Col></Col>
						<Col style={border2}>
							<Form.Label className="mt-2">Average Speed (cpm)</Form.Label>
							<Col><Form.Label>68.5</Form.Label></Col>
						</Col>
						<Col></Col>
						<Col style={border2} className="mr-4">
							<Form.Label className="mt-2">Top Speed (cpm)</Form.Label>
							<Col><Form.Label>74.6</Form.Label></Col>
						</Col>
					</Row>
					
					<Col className="mt-4">
						<Button variant="outline-dark" href="/stats">View Stats</Button>
					</Col>

				</Row>
      </Container>
    </div>  
  );
}

export default Profile;