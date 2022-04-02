import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBarPartial';
import { Form, Button, Container } from "react-bootstrap";

const root = {
  height: '100vh',
}

const signIn = {
  marginLeft: 'auto',
  marginRight: 'auto',
  padding : '4vh',
  marginTop : '15vh',

  border : '2px',
  borderStyle : 'solid',
  borderColor : 'black',
};

function SignIn() {
  return (
    <div style={root}>
      <NavBar/> 
      <Container>
        <div style={signIn}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="display-5">Sign In</Form.Label>
              <Form.Text>to access SpeedCode</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="username" placeholder="Username" />
              <br/>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="outline-dark" type="submit">Sign In</Button>
              <Form.Text className="text-muted">Don't have an account?</Form.Text>
              <Button variant="link" href="/signup"> Sign Up</Button>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>  
  );
}

export default SignIn;