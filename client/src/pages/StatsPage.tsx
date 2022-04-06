import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBarFull';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import chart1 from './../assets/chart1.png';
import chart2 from './../assets/chart2.png';
import chart3 from './../assets/chart3.png';
import chart4 from './../assets/chart4.png';

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

const titleSize = {
  fontSize : '28px'
}

const chartSize = {
  height : '180px',
  width : '288px',
}

function Stats() {
  return (
	  <div>
      <NavBar/>       
      <Container style={center}>
        <Row className="mt-4 px-5" style={border}>
          <Row className="text-left"><Col>
						<Button variant="outline-dark" href="/profile">Back</Button>
					</Col></Row>
					<Row className="mb-4"><Col>
						<Form.Label variant="outline-dark" href="/settings" style={titleSize}>Typing Statistics</Form.Label>
					</Col></Row>

					<Row>
						<Col className="ml-5">
              <Row className="mb-3" style={chartSize}><img src={chart1}/></Row>
              <Row><Form.Label>Key Frequency</Form.Label></Row>
						</Col>
						<Col></Col>
						<Col className="mr-5">
              <Row className="mb-3" style={chartSize}><img src={chart2}/></Row>
              <Row><Form.Label>Relative Typing Speed</Form.Label></Row>
						</Col>
					</Row>

					<Row className="mt-4 mb-2">
						<Col className="ml-5">
              <Row className="mb-3" style={chartSize}><img src={chart3}/></Row>
              <Row><Form.Label>Practice Calendar</Form.Label></Row>
						</Col>
						<Col></Col>
						<Col className="mr-5">
              <Row className="mb-3" style={chartSize}><img src={chart4}/></Row>
              <Row><Form.Label>Typing Speed</Form.Label></Row>
						</Col>
					</Row>

				</Row>
      </Container>
    </div>
  );
}

export default Stats;