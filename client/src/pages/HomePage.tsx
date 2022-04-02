import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBarPartial';
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
            <Form.Label className="display-3">Become Lightining Fast at Writing Code!</Form.Label>
            <Form.Label className="display-5">Compete in races against other players or practice solo.</Form.Label>
            <Button variant="outline-dark" type="submit">Start Practicing Now</Button>
          </Col>
          <Col className="text-center" md={{span: 2, offset: 1 }}>
            {/* <Image src="data:image/png;base64,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"/> */}
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1FuQPYlLrX8XZRPBPIUNgBubGJy5gYSr6x8f8dLm55Tfxb2-0HL6Vr4JVqTV8I9pltD0&usqp=CAU"/>
            
          </Col>
        </Row>
      </Container>
    </div>  
  );
}

export default Home;