import React from "react";
import NavBar from '../components/NavBarPartial';
import { Form, Button, Container } from "react-bootstrap";

const center = {
  position: 'absolute' as 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

const border = {
  padding : '10vmax',
  border : '2px',
  borderStyle : 'solid',
  borderColor : 'black',
  borderRadius : '10px'
};

function SignUp() {
  return (
    <div>
      <NavBar/> 
      <Container style={center}>
        <div style={border}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="display-5">Sign Up</Form.Label>
              <Form.Text>for a access SpeedCode</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="username" placeholder="Username" />
              <br/>
              <Form.Control type="password" placeholder="Password" />
              <br/>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="outline-dark" type="submit" href="/newgame">Sign Up</Button>
              <Form.Text className="text-muted">Already have an account?</Form.Text>
              <Button variant="link" href="/signin"> Sign In</Button>
            </Form.Group>
          </Form>
        </div>
      </Container>
    </div>  
  );
}

export default SignUp;