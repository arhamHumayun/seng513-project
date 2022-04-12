import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBarFull';
import LobbyPlayers from "../components/lobbyPlayers";
import { getLobbyData } from "../services/lobby";
import { IUser } from "../interfaces/types";
import { Form, Button, Container, Row, Col, ProgressBar } from "react-bootstrap";
import '../index.css';
import GameData from "../models/Game";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertCompilerOptionsFromJson } from "typescript";
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

const wrongText = {
  backgroundColor: '#FDBBBC'
};
const validText = {
  backgroundColor: '#C7FDBB'
};
const disabledText = {
  backgroundColor: '#D3D3D3',
  pointerEvents : "none",
};

let correctKeyStrokes = 0;
let incorrectKeyStrokes = 0;
let startTime = 0;
let endTime  = 0;
let newLineStartTime = 0;
// let newLineEndTime  = 0;

function Lobby() {
  
  const [codeSnippet, setCodeSnippet] = useState("");
  const [userInput, setUserInput] = useState("");
  const [inputColor, setinputColor] = useState(validText);
  const [players, setPlayers] = useState<IUser[]>([]);
  const [lobbyCode, setLobbyCode] = useState<string>("");
  
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

  // execute when joining lobby -> adds players & code to UI 
  async function joinedLobby() {
    let res = await getLobbyData(userObj!._id);
    console.log(res);
    setLobbyCode(res.code);
    // populate UI with players in lobby
    let players = [];
    for (var i = 0; i < res.players.length; i++) {
      if (res.players[i].name == userObj!.name) { // mark user's name with '(you)' to distinguish them
        res.players[i].name = res.players[i].name + ' (you)';
      }
      players.push(res.players[i]);
    }
    setPlayers(players); // update players state
  }

  // do stuff when game starts
  function startGame() {
    // add countdown timer?
    setCodeSnippet("def multiply(a, b):\nreturn(a * b)");
    startTime = new Date().getTime(); // start time
    newLineStartTime = new Date().getTime(); // start time
  }

  // compare input against code snippet as user types
  function handleTyping(userInput : string) {
    let length = userInput.length;
    let subStr = codeSnippet.substring(0, length);

    if (subStr == userInput) { // text matches
      setinputColor(validText); // change to green
      correctKeyStrokes ++;
      
      if (length == codeSnippet.length) { // user finished
        setinputColor(disabledText);
        endTime = new Date().getTime(); // set end time
        let totalTimeSeconds = (endTime - startTime) / 1000;
        let accuracy = (correctKeyStrokes / (correctKeyStrokes + incorrectKeyStrokes)) *100;
        console.log(userObj!.name + ` finished typing in ${totalTimeSeconds} seconds with ${accuracy} accuracy!`)
        handleCompletedLine();
        // create player game stats obj
        let CPM = codeSnippet.length / (totalTimeSeconds / 60);
        let gameData = new GameData(userObj!.name, CPM, accuracy, 100);
        console.log('GameData: ' + JSON.stringify(gameData));
        // TODO: send entire game stats or average line stats for player on server?
      }
    }
    else { // text doesn't match
      setinputColor(wrongText); // change to red
      incorrectKeyStrokes ++;
    }
  }

  // completion of each line
  function handleCompletedLine() {
    // get game data stats for line
    let CPM = userInput.length / ((new Date().getTime() - newLineStartTime) / 60000);
    let progress = ((userInput.length +1) / codeSnippet.length) * 100;
    let accuracy = (correctKeyStrokes / (correctKeyStrokes + incorrectKeyStrokes)) *100;
    let gameLineData = new GameData(userObj!.name, CPM, accuracy, progress);
    console.log('Line Data: ' + JSON.stringify(gameLineData));
    // reset timer
    newLineStartTime = new Date().getTime();
    // TODO: send data to server
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
    <div onLoad= {() => joinedLobby()}>
      <NavBar/>       
      <Container fluid style={center}>
        <Col>
          <Row className="text-left">
            <Form.Label >Room Code: {lobbyCode}</Form.Label>
          </Row>
          <Container>
            <LobbyPlayers players={players}/>
            {/* <Row>
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
            </Row> */}
          </Container>
          <Row>
            <Form.Label>Code Snippet</Form.Label>
          </Row>
          <Container>
            <Row className="text-left" style={border}>
              {/* <h5 className="display-linebreak">{codeSnippet}</h5> */}
              <textarea disabled value={codeSnippet}></textarea>
            </Row>
            <br/>
            <Row>
              <textarea style={inputColor}  placeholder="Type the above code snippet here when the race begins" onKeyPress={(e) => e.key === 'Enter' && handleCompletedLine()} onChange={(event) => {
                event.preventDefault();
                setUserInput(event.target.value);
                handleTyping(event.target.value);
              }}/>
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
              <Button variant="outline-dark" onClick={(event) => {
                event.preventDefault();
                startGame();           
              }}>Start</Button>
            </Col>
          </Row>
        </Col>
      </Container>
    </div>

  );

}

export default Lobby;