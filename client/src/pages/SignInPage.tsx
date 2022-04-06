import React, {useState} from "react";
import { loginUser } from "../services/users";
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

function SignIn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    try {
      let res = await loginUser(username, password);
      console.log(res)
    } catch (err) {
      console.log(err)
    }
    setUsername("");
    setPassword("");
  }

  return (
    <div>
      <NavBar/> 
      <Container style={center}>
        <div style={border}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="display-5">Sign In</Form.Label>
              <Form.Text>to access SpeedCode</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="username" placeholder="Username" onChange={(event) => {
                setUsername(event.target.value);
              }}/>
              <br/>
              <Form.Control type="password" placeholder="Password" onChange={(event) => {
                setPassword(event.target.value);
              }}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="outline-dark" type="submit" href="/newgame" onClick={(event) => {
                event.preventDefault();
                submit()
              }}>Sign In</Button>
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