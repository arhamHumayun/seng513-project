import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/users";
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // page navigation
  let navigate = useNavigate(); 
  const routeChange = (path : string) =>{ 
    navigate(path);
  }

  // form submission
  async function submit() {
    // form validation
    if ( username === "" || password === "" || confirmPassword === "") {
      alert("Please fill out all fields.");
      return;
    }
    if (!(password === confirmPassword)) {
      alert("The passwords don't match.");
      return;
    }
    try {
      let res = await createUser(username, password);
      console.log(res)
      routeChange("/signin"); // change path on success
    } catch (err) {
      alert("Username: '" + username + "' is already taken.");
      console.log(err)
    }
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

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
              <Form.Control type="username" value={username} placeholder="Username" onChange={(event) => {
                setUsername(event.target.value);
              }}/>
              <br/>
              <Form.Control type="password" value={password} placeholder="Password" onChange={(event) => {
                setPassword(event.target.value);
              }}/>
              <br/>
              <Form.Control type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="outline-dark" type="submit" href="/newgame" onClick={(event) => {
                event.preventDefault();
                submit();                
              }}>Sign Up</Button>
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