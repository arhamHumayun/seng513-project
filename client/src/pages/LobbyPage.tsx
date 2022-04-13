import React from "react";
import { useState } from 'react';
import NavBar from '../components/NavBarFull';
import LobbyPlayers from "../components/lobbyPlayers";
import { getLobbyData, getCodeSnippet, startGameService, updatePlayerState, getScoreboard, writeScoreboard } from "../services/lobby";
import { IPlayerStat, IScoreboard } from "../interfaces/types";
import { Form, Button, Container, Row, Col, ProgressBar } from "react-bootstrap";
import '../index.css';
import GameData from "../models/Game";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { convertCompilerOptionsFromJson } from "typescript";
import { url } from "inspector";
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
  borderRadius : '10px',
  backgroundColor : 'black'
};

const wrongText = {
  backgroundColor: '#FDBBBC',
};
const validText = {
  backgroundColor: '#C7FDBB',
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
let pollingRate = 2000;

function Lobby() {
  
  const [codeSnippet, setCodeSnippet] = useState("");
  const [userInput, setUserInput] = useState("");
  const [inputColor, setinputColor] = useState(validText);
  const [players, setPlayers] = useState<IPlayerStat[]>([]);
  const [lobbyCode, setLobbyCode] = useState<string>("");
  const [title, setTitle] = useState("Code Snippet");
  
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
  async function lobbyPolling() {
    let res = await getLobbyData(userObj!._id);
    console.log(res);
    setLobbyCode(res.code);
    // populate UI with players in lobby
    let players = [];
    for (var i = 0; i < res.playerStats.length; i++) {
      if (res.playerStats[i].user.name == userObj!.name) { // mark user's name with '(you)' to distinguish them
        res.playerStats[i].user.name = res.playerStats[i].user.name + ' (you)';
      }
      players.push(res.playerStats[i]);
    }
    setPlayers(players); // update players state

    // poll lobby for new players until game starts
    if (res.gameRunning == false) {
      setTimeout(lobbyPolling, pollingRate); // every 5 seconds
    }
    else { // game started, switch to polling game data
      setCodeSnippet(res.gameCode.code);
      setTimeout(gamePolling, pollingRate); // every 5 seconds
    }
  }

  // get live stats during game play
  async function gamePolling() {
    console.log('Polling for game data');
    let res = await getLobbyData(userObj!._id);
    console.log(res);
    let players = [];
    for (var i = 0; i < res.playerStats.length; i++) {
      if (res.playerStats[i].user.name == userObj!.name) { // mark user's name with '(you)' to distinguish them
        res.playerStats[i].user.name = res.playerStats[i].user.name + ' (you)';
      }
      players.push(res.playerStats[i]);
    }
    setPlayers(players); // update players state
    // continue polling while game is running
    if (res.gameRunning == true) {
      setTimeout(gamePolling, pollingRate);
    }
    else { // game is over, display scoreboard
      let scoreboard_res = await getScoreboard(res.code);
      console.log(scoreboard_res);
      let scoreboard = await writeScoreboard(scoreboard_res);
      setCodeSnippet(scoreboard); // display 
      setTitle("Results")
    }
  }

  // when host starts the game
  async function startGame() {
    // add countdown timer?
    let code_res = await getCodeSnippet();
    console.log(code_res);
    let game_res = await startGameService(userObj!._id, lobbyCode, code_res._id);
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
        handleCompletedLine();
        // create player game stats obj
        let CPM = codeSnippet.length / (totalTimeSeconds / 60);
        let gameData = new GameData(userObj!.name, CPM, accuracy, 100);
      }
    }
    else { // text doesn't match
      setinputColor(wrongText); // change to red
      incorrectKeyStrokes ++;
    }
  }

  // completion of each line (user hits 'enter' key)
  async function handleCompletedLine() {
      let CPM = userInput.length / ((new Date().getTime() - newLineStartTime) / 60000);
      let progress = ((userInput.length +1) / codeSnippet.length) * 100;
      let accuracy = (correctKeyStrokes / (correctKeyStrokes + incorrectKeyStrokes)) *100;
      let gameLineData = new GameData(userObj!.name, CPM, accuracy, progress);
      console.log('Line Data: ' + JSON.stringify(gameLineData));
      // reset timer
      newLineStartTime = new Date().getTime();
      // send data to server
      let res = await updatePlayerState(userObj!._id, lobbyCode, CPM, correctKeyStrokes, incorrectKeyStrokes);
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
    <div  onLoad= {() => lobbyPolling()}>
      <NavBar/>       
      <Container fluid className="consolas" style={center}>
        <Col>
          <Row className="text-left">
            <div >
              <Form.Label className="roomCode">Room Code: {lobbyCode}</Form.Label>
            </div>
          </Row>
          <Row>
            <Form.Label className="title">Racers</Form.Label>
          </Row>
          <Container>
            <LobbyPlayers playerStats={players}/>
          </Container>
          <Row>
            <Form.Label className="title">{title}</Form.Label>
          </Row>
          <Container>
            <Row>
              <div className="terminalParent">
                <div className="terminalWindow">
                  <pre><code className="terminalTextGreen">{codeSnippet}</code></pre>
                </div>
              </div>
            </Row>
            <br/>
            <Row>
              <textarea className="inputText" style={inputColor}  placeholder="Type the above code snippet here when the race begins" onKeyPress={(e) => e.key === 'Enter' && handleCompletedLine()} onChange={(event) => {
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